import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { TerminalVendorService } from './terminal-vendor.service';
import { CreateTerminalVendorDto } from './dto/create-terminal-vendor.dto';
import { UpdateTerminalVendorDto } from './dto/update-terminal-vendor.dto';

@Controller('terminal-vendors')
export class TerminalVendorController {
  constructor(private readonly terminalVendorService: TerminalVendorService) {}

  @Post()
  create(@Body() createTerminalVendorDto: CreateTerminalVendorDto) {
    return this.terminalVendorService.create(createTerminalVendorDto);
  }

  @Get()
  findAll() {
    return this.terminalVendorService.findAll();
  }
  
  @Patch(':name')
  update(@Param('name') name: string, @Body() updateTerminalVendorDto: UpdateTerminalVendorDto) {
    return this.terminalVendorService.update(name, updateTerminalVendorDto);
  }

  @Delete(':name')
  remove(@Param('name') name: string) {
    return this.terminalVendorService.remove(name);
  }
}
