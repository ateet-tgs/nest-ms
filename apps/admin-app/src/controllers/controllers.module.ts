import { Module } from '@nestjs/common';
import { CustomerModule } from './customer/customer.module';
import { ItemsModule } from './items/items.module';

@Module({
  imports: [CustomerModule, ItemsModule],
})
export class ControllersModule {}
