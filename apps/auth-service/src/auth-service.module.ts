import { Module } from '@nestjs/common';
import { AuthService } from './auth-service.service';
import { SharedConfigModule } from '@app/config';
import { DatabaseModule } from '@app/database';
import { AuthController } from './auth-service.controller';
import { PassportModule } from '@nestjs/passport';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { SequelizeModule } from '@nestjs/sequelize';
import { Customer } from '@app/database/models';
import { JwtStrategy } from '@app/common/providers';
import { JwtAuthGuard } from '@app/common/gaurds';
import { RabbitMQModule } from '@app/rabbitmq';

@Module({
  imports: [
    SharedConfigModule,
    DatabaseModule,
    PassportModule,
    RabbitMQModule,
    SequelizeModule.forFeature([Customer]),
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '60m' },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtAuthGuard, JwtStrategy],
})
export class AuthServiceModule {}
