import { Module } from '@nestjs/common';
import { TerminalService } from './terminal.service';
import { TerminalController } from './terminal.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Terminal } from './entities/terminal.entity';
import { TerminalType } from 'src/terminal-type/entities/terminal-type.entity';
import { TerminalStatus } from 'src/terminal-status/entities/terminal-status.entity';
import { TerminalModel } from 'src/terminal-model/entities/terminal-model.entity';
import { Region } from 'src/regions/entities/region.entity';
import { City } from 'src/cities/entities/city.entity';
import { State } from 'src/states/entities/state.entity';
import { Customer } from 'src/customers/entities/customer.entity';
import { TerminalLocation } from 'src/terminal-location/entities/terminal-location.entity';
import { TerminalVendor } from 'src/terminal-vendor/entities/terminal-vendor.entity';
import { TerminalPurchaseOrder } from 'src/terminal-purchase-order/entities/terminal-purchase-order.entity';

@Module({
  imports: [TypeOrmModule.forFeature(
    [Terminal, TerminalType, TerminalPurchaseOrder,
      TerminalStatus, TerminalModel, Region,
      City, State, Customer, TerminalLocation, TerminalVendor]
  )],
  controllers: [TerminalController],
  providers: [TerminalService],
  exports: [TypeOrmModule]
})
export class TerminalModule { }
