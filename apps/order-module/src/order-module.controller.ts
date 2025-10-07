import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Req,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { OrderModuleService } from './order-module.service';
import { YupValidationPipe } from '@app/common/pipes';
import { createOrderSchema } from '@app/common/validators/order.validators';
import type { CreateOrderDto } from '@app/common/dto/order.dto';
import type { Request } from 'express';
import { JwtAuthGuard } from '@app/common/gaurds';
import { CacheInterceptor, CacheKey, CacheTTL } from '@nestjs/cache-manager';

@Controller()
@UseInterceptors(CacheInterceptor)
export class OrderModuleController {
  constructor(private readonly orderModuleService: OrderModuleService) {}

  @Get()
  getHello(): string {
    return this.orderModuleService.getHello();
  }

  @Post('/create')
  @UseGuards(JwtAuthGuard)
  create(
    @Body(new YupValidationPipe(createOrderSchema))
    data: CreateOrderDto,
    @Req() request: Request,
  ) {
    const customerId = (request?.user as any)?.userId;
    return this.orderModuleService.create(data, customerId);
  }

  @Get('/get-order/:id')
  @UseGuards(JwtAuthGuard)
  @CacheKey('order_detail')
  @CacheTTL(6000)
  getOrderDetail(@Param('id') id: string) {
    console.log('Fetching from DB');
    return this.orderModuleService.getOrderbyId(id);
  }
}
