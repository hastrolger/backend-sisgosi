import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { TerminalService } from './terminal.service';
import { CreateTerminalDto } from './dto/create-terminal.dto';
import { UpdateTerminalDto } from './dto/update-terminal.dto';

@Controller('terminal')
export class TerminalController {
  constructor(private readonly terminalService: TerminalService) {}

  @Post()
  create(@Body() createTerminalDto: CreateTerminalDto) {
    return this.terminalService.create(createTerminalDto);
  }

  @Get()
  findAll() {
    return this.terminalService.findAll();
  }

  @Get(':code')
  findOne(@Param('code') code: string) {
    return this.terminalService.findOne(code);
  }

  @Patch(':code')
  update(@Param('code') code: string, @Body() updateTerminalDto: UpdateTerminalDto) {
    return this.terminalService.update(code, updateTerminalDto);
  }

  @Delete(':code')
  remove(@Param('code') code: string) {
    return this.terminalService.remove(code);
  }
}
