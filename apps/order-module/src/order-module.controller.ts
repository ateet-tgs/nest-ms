import { Controller, Get } from '@nestjs/common';
import { OrderModuleService } from './order-module.service';

@Controller()
export class OrderModuleController {
  constructor(private readonly orderModuleService: OrderModuleService) {}

  @Get()
  getHello(): string {
    return this.orderModuleService.getHello();
  }
}
