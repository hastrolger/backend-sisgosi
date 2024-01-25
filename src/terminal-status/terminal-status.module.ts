import { Module } from '@nestjs/common';
import { TerminalStatusService } from './terminal-status.service';
import { TerminalStatusController } from './terminal-status.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TerminalStatus } from './entities/terminal-status.entity';

@Module({
  imports: [TypeOrmModule.forFeature([TerminalStatus])],
  controllers: [TerminalStatusController],
  providers: [TerminalStatusService],
  exports: [TypeOrmModule]

})
export class TerminalStatusModule {}
