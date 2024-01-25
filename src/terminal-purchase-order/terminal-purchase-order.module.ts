import { Module } from '@nestjs/common';
import { TerminalPurchaseOrderService } from './terminal-purchase-order.service';
import { TerminalPurchaseOrderController } from './terminal-purchase-order.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TerminalPurchaseOrder } from './entities/terminal-purchase-order.entity';

@Module({
  imports: [TypeOrmModule.forFeature([TerminalPurchaseOrder])],
  controllers: [TerminalPurchaseOrderController],
  providers: [TerminalPurchaseOrderService],
  exports: [TypeOrmModule]
})
export class TerminalPurchaseOrderModule {}
