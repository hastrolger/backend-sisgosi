import { Module } from '@nestjs/common';
import { TerminalPurchaseOrderService } from './terminal-purchase-order.service';
import { TerminalPurchaseOrderController } from './terminal-purchase-order.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TerminalPurchaseOrder } from './entities/terminal-purchase-order.entity';
import { Customer } from 'src/customers/entities/customer.entity';

@Module({
  imports: [TypeOrmModule.forFeature([TerminalPurchaseOrder, Customer])],
  controllers: [TerminalPurchaseOrderController],
  providers: [TerminalPurchaseOrderService],
  exports: [TypeOrmModule]
})
export class TerminalPurchaseOrderModule {}
