import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { TerminalStatusService } from './terminal-status.service';
import { CreateTerminalStatusDto } from './dto/create-terminal-status.dto';
import { UpdateTerminalStatusDto } from './dto/update-terminal-status.dto';

@Controller('terminal-status')
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

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.terminalStatusService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTerminalStatusDto: UpdateTerminalStatusDto) {
    return this.terminalStatusService.update(+id, updateTerminalStatusDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.terminalStatusService.remove(+id);
  }
}
