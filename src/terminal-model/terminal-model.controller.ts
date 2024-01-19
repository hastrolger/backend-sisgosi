import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { TerminalModelService } from './terminal-model.service';
import { CreateTerminalModelDto } from './dto/create-terminal-model.dto';
import { UpdateTerminalModelDto } from './dto/update-terminal-model.dto';

@Controller('terminal-model')
export class TerminalModelController {
  constructor(private readonly terminalModelService: TerminalModelService) {}

  @Post()
  create(@Body() createTerminalModelDto: CreateTerminalModelDto) {
    return this.terminalModelService.create(createTerminalModelDto);
  }

  @Get()
  findAll() {
    return this.terminalModelService.findAll();
  }

  @Get(':name')
  findOne(@Param('name') name: string) {
    return this.terminalModelService.findOne(name);
  }

  @Patch(':name')
  update(@Param('name') name: string, @Body() updateTerminalModelDto: UpdateTerminalModelDto) {
    return this.terminalModelService.update(name, updateTerminalModelDto);
  }

  @Delete(':name')
  remove(@Param('name') name: string) {
    return this.terminalModelService.remove(name);
  }
}
