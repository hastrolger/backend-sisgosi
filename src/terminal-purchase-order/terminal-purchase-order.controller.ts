import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { TerminalPurchaseOrderService } from './terminal-purchase-order.service';
import { CreateTerminalPurchaseOrderDto } from './dto/create-terminal-purchase-order.dto';
import { UpdateTerminalPurchaseOrderDto } from './dto/update-terminal-purchase-order.dto';

@Controller('terminal-purchase-orders')
export class TerminalPurchaseOrderController {
  constructor(private readonly terminalPurchaseOrderService: TerminalPurchaseOrderService) {}

  @Post()
  create(@Body() createTerminalPurchaseOrderDto: CreateTerminalPurchaseOrderDto) {
    return this.terminalPurchaseOrderService.create(createTerminalPurchaseOrderDto);
  }

  @Get()
  findAll() {
    return this.terminalPurchaseOrderService.findAll();
  }

  @Patch(':code')
  update(@Param('code') code: string, @Body() updateTerminalPurchaseOrderDto: UpdateTerminalPurchaseOrderDto) {
    return this.terminalPurchaseOrderService.update(code, updateTerminalPurchaseOrderDto);
  }

  @Delete(':code')
  remove(@Param('code') code: string) {
    return this.terminalPurchaseOrderService.remove(code);
  }
}
