import { CreateCustomerDto, LoginDto } from '@app/common/dto';
import { Customer } from '@app/database/models';
import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ClientProxy } from '@nestjs/microservices';
import { InjectModel } from '@nestjs/sequelize';

@Injectable()
export class AuthService {
  constructor(
    private jwtservice: JwtService,
    @InjectModel(Customer)
    private readonly customerModel: typeof Customer,
    @Inject('RABBITMQ_SERVICE')
    private readonly activityClient: ClientProxy,
  ) {}

  async register(data: CreateCustomerDto) {
    try {
      const item = await this.customerModel.create(data as any);
      return item;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async login(data: LoginDto) {
    const user = await this.customerModel.findOne({
      where: { email: data.email },
    });
    if (!user) {
      throw new UnauthorizedException('Invalid Credentials');
    }
    const payload = {
      sub: user.id,
      email: user.email,
      role: 'customer',
    };
    const accessToken = this.jwtservice.sign(payload, {
      expiresIn: '1h',
      secret: process.env.jwtSecret,
    });
    const refreshToken = this.jwtservice.sign(payload, {
      expiresIn: '7d',
      secret: process.env.jwtSecret,
    });
    console.log('-'.repeat(50));
    console.log('User logged in:', user.email);
    console.log('-'.repeat(50));

    this.activityClient.send('LOGIN_SUCCESS', {
      data: user.dataValues,
      description: `Customer ${user.email} logged in`,
    });
    return {
      status: true,
      message: 'Login successful!!',
      data: {
        accessToken,
        refreshToken,
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
          role: 'customer',
        },
      },
    };
  }

  async refreshToken(token: string) {
    try {
      const decoded = this.jwtservice.verify(token);
      const payload = await this.customerModel.findByPk(decoded.sub);
      if (!payload) {
        throw new UnauthorizedException('Invalid Token');
      }
      const newAccessToken = this.jwtservice.sign(
        { sub: payload.id, email: payload.email, role: 'customer' },
        { expiresIn: '15m' },
      );
      return { accessToken: newAccessToken };
    } catch (error) {
      throw new UnauthorizedException('Invalid Token');
    }
  }
}
