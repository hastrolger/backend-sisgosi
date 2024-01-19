import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { TerminalTypeService } from './terminal-type.service';
import { CreateTerminalTypeDto } from './dto/create-terminal-type.dto';
import { UpdateTerminalTypeDto } from './dto/update-terminal-type.dto';

@Controller('terminal-type')
export class TerminalTypeController {
  constructor(private readonly terminalTypeService: TerminalTypeService) {}

  @Post()
  create(@Body() createTerminalTypeDto: CreateTerminalTypeDto) {
    return this.terminalTypeService.create(createTerminalTypeDto);
  }

  @Get()
  findAll() {
    return this.terminalTypeService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.terminalTypeService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTerminalTypeDto: UpdateTerminalTypeDto) {
    return this.terminalTypeService.update(+id, updateTerminalTypeDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.terminalTypeService.remove(+id);
  }
}
