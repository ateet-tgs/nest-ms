import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ItemsService } from './items.service';
import type { CreateItemDto, UpdateItemDto } from '@app/common/dto';
import { YupValidationPipe } from '@app/common/pipes';
import { createItemSchema, updateItemSchema } from '@app/common/validators';

@Controller('items')
export class ItemsController {
  constructor(private readonly itemsService: ItemsService) {}

  @Post()
  create(
    @Body(new YupValidationPipe(createItemSchema)) createItemDto: CreateItemDto,
  ) {
    return this.itemsService.create(createItemDto);
  }

  @Get()
  findAll() {
    return this.itemsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.itemsService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body(new YupValidationPipe(updateItemSchema)) updateItemDto: UpdateItemDto,
  ) {
    return this.itemsService.update(+id, updateItemDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.itemsService.remove(+id);
  }
}
