import { Module } from '@nestjs/common';
import { TerminalVendorService } from './terminal-vendor.service';
import { TerminalVendorController } from './terminal-vendor.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TerminalVendor } from './entities/terminal-vendor.entity';

@Module({
  imports: [TypeOrmModule.forFeature([TerminalVendor])],
  controllers: [TerminalVendorController],
  providers: [TerminalVendorService],
  exports: [TypeOrmModule]
})
export class TerminalVendorModule {}
