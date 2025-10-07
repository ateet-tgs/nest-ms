import { CreateCustomerDto, UpdateCustomerDto } from '@app/common/dto';
import { Customer } from '@app/database/models';
import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { InjectModel } from '@nestjs/sequelize';

@Injectable()
export class CustomerService {
  constructor(
    @InjectModel(Customer)
    private readonly customerModel: typeof Customer,
    @Inject('MAIL_SERVICE') private readonly mailClient: ClientProxy,
  ) {}

  async create(data: CreateCustomerDto) {
    try {
      const item = await this.customerModel.create(
        {
          ...data,
          password: '123123',
        } as any,
        {
          hooks: true,
        },
      );
      this.mailClient.emit(
        { cmd: 'send_mail' },
        { to: data.email, subject: 'Hi', body: 'Welcome to Expriment!' },
      );
      return item;
    } catch (error) {
      return error;
    }
  }

  async findAll() {
    try {
      const items = await this.customerModel.findAll();
      return items;
    } catch (error) {
      return error;
    }
  }

  findOne(id: number) {
    return `This action returns a #${id} customer`;
  }

  update(id: number, updateCustomerDto: UpdateCustomerDto) {
    return `This action updates a #${id} customer`;
  }

  remove(id: number) {
    return `This action removes a #${id} customer`;
  }
}
