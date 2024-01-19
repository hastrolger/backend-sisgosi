import { Module } from '@nestjs/common';
import { TerminalStatusService } from './terminal-status.service';
import { TerminalStatusController } from './terminal-status.controller';

@Module({
  controllers: [TerminalStatusController],
  providers: [TerminalStatusService],
})
export class TerminalStatusModule {}
