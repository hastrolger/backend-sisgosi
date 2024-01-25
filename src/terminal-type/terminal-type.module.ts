import { Module } from '@nestjs/common';
import { TerminalTypeService } from './terminal-type.service';
import { TerminalTypeController } from './terminal-type.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TerminalType } from './entities/terminal-type.entity';

@Module({
  imports: [TypeOrmModule.forFeature([TerminalType])],
  controllers: [TerminalTypeController],
  providers: [TerminalTypeService],
  exports: [TypeOrmModule]
})
export class TerminalTypeModule {}
