import { Injectable } from '@nestjs/common';
import { CreateTerminalPurchaseOrderDto } from './dto/create-terminal-purchase-order.dto';
import { UpdateTerminalPurchaseOrderDto } from './dto/update-terminal-purchase-order.dto';

@Injectable()
export class TerminalPurchaseOrderService {
  create(createTerminalPurchaseOrderDto: CreateTerminalPurchaseOrderDto) {
    return 'This action adds a new terminalPurchaseOrder';
  }

  findAll() {
    return `This action returns all terminalPurchaseOrder`;
  }

  findOne(id: number) {
    return `This action returns a #${id} terminalPurchaseOrder`;
  }

  update(id: number, updateTerminalPurchaseOrderDto: UpdateTerminalPurchaseOrderDto) {
    return `This action updates a #${id} terminalPurchaseOrder`;
  }

  remove(id: number) {
    return `This action removes a #${id} terminalPurchaseOrder`;
  }
}
