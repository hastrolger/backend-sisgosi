import { Module } from '@nestjs/common';
import { TerminalModelService } from './terminal-model.service';
import { TerminalModelController } from './terminal-model.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TerminalModel } from './entities/terminal-model.entity';
import { TerminalVendor } from 'src/terminal-vendor/entities/terminal-vendor.entity';

@Module({
  imports: [TypeOrmModule.forFeature([TerminalModel, TerminalVendor])],
  controllers: [TerminalModelController],
  providers: [TerminalModelService],
})
export class TerminalModelModule {}
