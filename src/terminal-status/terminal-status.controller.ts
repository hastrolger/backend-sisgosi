import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { TerminalStatusService } from './terminal-status.service';
import { CreateTerminalStatusDto } from './dto/create-terminal-status.dto';
import { UpdateTerminalStatusDto } from './dto/update-terminal-status.dto';

@Controller('terminal-statuses')
export class TerminalStatusController {
  constructor(private readonly terminalStatusService: TerminalStatusService) {}

  @Post()
  create(@Body() createTerminalStatusDto: CreateTerminalStatusDto) {
    return this.terminalStatusService.create(createTerminalStatusDto);
  }

  @Get()
  findAll() {
    return this.terminalStatusService.findAll();
  }

  @Patch(':name')
  update(@Param('name') name: string, @Body() updateTerminalStatusDto: UpdateTerminalStatusDto) {
    return this.terminalStatusService.update(name, updateTerminalStatusDto);
  }

  @Delete(':name')
  remove(@Param('name') name: string) {
    return this.terminalStatusService.remove(name);
  }
}
