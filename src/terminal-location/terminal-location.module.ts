import { Module } from '@nestjs/common';
import { TerminalLocationService } from './terminal-location.service';
import { TerminalLocationController } from './terminal-location.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TerminalLocation } from './entities/terminal-location.entity';

@Module({
  imports:[TypeOrmModule.forFeature([TerminalLocation])],
  controllers: [TerminalLocationController],
  providers: [TerminalLocationService],
  exports: [TypeOrmModule],
})
export class TerminalLocationModule {}
