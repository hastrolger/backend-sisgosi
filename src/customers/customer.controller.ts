import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CustomerService } from './customer.service';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';

@Controller('customers')
export class CustomerController {
  constructor(private readonly customerService: CustomerService) {}

  @Post()
  create(@Body() createCustomerDto: CreateCustomerDto) {
    return this.customerService.create(createCustomerDto);
  }

  @Get()
  findAll() {
    return this.customerService.findAll();
  }

  @Patch(':name')
  update(@Param('name') name: string, @Body() updateCustomerDto: UpdateCustomerDto) {
    return this.customerService.update(name, updateCustomerDto);
  }

  @Delete(':name')
  remove(@Param('name') name: string) {
    return this.customerService.remove(name);
  }
}
