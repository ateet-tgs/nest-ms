import { CreateCustomerDto, UpdateCustomerDto } from '@app/common/dto';
import { Customer } from '@app/database/models';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';

@Injectable()
export class CustomerService {
  constructor(
    @InjectModel(Customer)
    private readonly customerModel: typeof Customer,
  ) {}

  async create(data: CreateCustomerDto) {
    try {
      const item = await this.customerModel.create(data as any);
      return item;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  findAll() {
    return `This action returns all customer`;
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
