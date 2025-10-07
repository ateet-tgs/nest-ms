import { Module } from '@nestjs/common';
import { OrderModuleController } from './order-module.controller';
import { OrderModuleService } from './order-module.service';
import { SharedConfigModule } from '@app/config';
import { DatabaseModule } from '@app/database';
import { SequelizeModule } from '@nestjs/sequelize';
import { Order } from '@app/database/models';
import { JwtStrategy } from '@app/common/providers';
import { JwtAuthGuard } from '@app/common/gaurds';
import { RedisCacheModule } from '@app/redis-cache';

@Module({
  imports: [
    SharedConfigModule,
    DatabaseModule,
    SequelizeModule.forFeature([Order]),
    RedisCacheModule,
  ],
  controllers: [OrderModuleController],
  providers: [OrderModuleService, JwtAuthGuard, JwtStrategy],
})
export class OrderModuleModule {}
