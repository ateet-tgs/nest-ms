import { CreateItemDto, UpdateItemDto } from '@app/common/dto';
import { Item } from '@app/database/models';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';

@Injectable()
export class ItemsService {
  constructor(
    @InjectModel(Item)
    private readonly itemModel: typeof Item,
  ) {}

  async create(createItemDto: CreateItemDto) {
    try {
      const data = await this.itemModel.create(createItemDto as any);
      return data;
    } catch (error) {
      return error;
    }
  }

  async findAll() {
    try {
      const items = await this.itemModel.findAll();
      return { data: items, status: true };
    } catch (error) {
      return error;
    }
  }

  findOne(id: number) {
    return `This action returns a #${id} item`;
  }

  update(id: number, updateItemDto: UpdateItemDto) {
    return `This action updates a #${id} item`;
  }

  remove(id: number) {
    return `This action removes a #${id} item`;
  }
}
