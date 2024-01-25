import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { TerminalTypeService } from './terminal-type.service';
import { CreateTerminalTypeDto } from './dto/create-terminal-type.dto';
import { UpdateTerminalTypeDto } from './dto/update-terminal-type.dto';

@Controller('terminal-types')
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


  @Patch(':name')
  update(@Param('name') name: string, @Body() updateTerminalTypeDto: UpdateTerminalTypeDto) {
    return this.terminalTypeService.update(name, updateTerminalTypeDto);
  }

  @Delete(':name')
  remove(@Param('name') name: string) {
    return this.terminalTypeService.remove(name);
  }
}
