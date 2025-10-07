import { CreateOrderDto } from '@app/common/dto/order.dto';
import { Order } from '@app/database/models';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';

@Injectable()
export class OrderModuleService {
  constructor(
    @InjectModel(Order)
    private readonly orderModel: typeof Order,
  ) {}

  getHello(): string {
    return 'Hello Order World!';
  }

  async create(data: CreateOrderDto, customerId: string) {
    try {
      const item = await this.orderModel.create(
        {
          orderDetails: data,
          status: 'pending',
          customerId,
        } as any,
        {
          hooks: true,
        },
      );
      return item;
    } catch (error) {
      return error;
    }
  }

  async getOrderbyId(id: string) {
    try {
      const order = await this.orderModel.findOne({
        where: { id },
        include: ['logs'],
      });
      return { data: order, status: true };
    } catch (error) {
      return error;
    }
  }
}
