import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { TerminalLocationService } from './terminal-location.service';
import { CreateTerminalLocationDto } from './dto/create-terminal-location.dto';
import { UpdateTerminalLocationDto } from './dto/update-terminal-location.dto';

@Controller('terminal-locations')
export class TerminalLocationController {
  constructor(private readonly terminalLocationService: TerminalLocationService) {}

  @Post()
  create(@Body() createTerminalLocationDto: CreateTerminalLocationDto) {
    return this.terminalLocationService.create(createTerminalLocationDto);
  }

  @Get()
  findAll() {
    return this.terminalLocationService.findAll();
  }

  @Patch(':name')
  update(@Param('name') name: string, @Body() updateTerminalLocationDto: UpdateTerminalLocationDto) {
    return this.terminalLocationService.update(name, updateTerminalLocationDto);
  }

  @Delete(':name')
  remove(@Param('name') name: string) {
    return this.terminalLocationService.remove(name);
  }
}
