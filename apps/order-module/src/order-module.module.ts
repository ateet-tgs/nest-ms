import { Module } from '@nestjs/common';
import { OrderModuleController } from './order-module.controller';
import { OrderModuleService } from './order-module.service';
import { SharedConfigModule } from '@app/config';
import { DatabaseModule } from '@app/database'; 

@Module({
  imports: [SharedConfigModule, DatabaseModule],
  controllers: [OrderModuleController],
  providers: [OrderModuleService],
})
export class OrderModuleModule {}
