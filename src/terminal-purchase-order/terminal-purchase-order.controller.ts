import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { TerminalPurchaseOrderService } from './terminal-purchase-order.service';
import { CreateTerminalPurchaseOrderDto } from './dto/create-terminal-purchase-order.dto';
import { UpdateTerminalPurchaseOrderDto } from './dto/update-terminal-purchase-order.dto';

@Controller('terminal-purchase-order')
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

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.terminalPurchaseOrderService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTerminalPurchaseOrderDto: UpdateTerminalPurchaseOrderDto) {
    return this.terminalPurchaseOrderService.update(+id, updateTerminalPurchaseOrderDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.terminalPurchaseOrderService.remove(+id);
  }
}
