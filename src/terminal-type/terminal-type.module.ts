import { Module } from '@nestjs/common';
import { TerminalTypeService } from './terminal-type.service';
import { TerminalTypeController } from './terminal-type.controller';

@Module({
  controllers: [TerminalTypeController],
  providers: [TerminalTypeService],
})
export class TerminalTypeModule {}
