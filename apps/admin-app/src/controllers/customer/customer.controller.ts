import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { CustomerService } from './customer.service';
import { YupValidationPipe } from '@app/common/pipes';
import {
  createCustomerValidator,
  updateCustomerValidator,
} from '@app/common/validators';
import type { CreateCustomerDto, UpdateCustomerDto } from '@app/common/dto';

@Controller('customer')
export class CustomerController {
  constructor(private readonly customerService: CustomerService) {}

  @Post()
  create(
    @Body(new YupValidationPipe(createCustomerValidator))
    createCustomerDto: CreateCustomerDto,
  ) {
    return this.customerService.create(createCustomerDto);
  }

  @Get()
  findAll() {
    return this.customerService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.customerService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body(new YupValidationPipe(updateCustomerValidator))
    updateCustomerDto: UpdateCustomerDto,
  ) {
    return this.customerService.update(+id, updateCustomerDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.customerService.remove(+id);
  }
}
