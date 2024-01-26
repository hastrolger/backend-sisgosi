import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { TechnicalAssistanceTypeService } from './technical-assistance-type.service';
import { CreateTechnicalAssistanceTypeDto } from './dto/create-technical-assistance-type.dto';
import { UpdateTechnicalAssistanceTypeDto } from './dto/update-technical-assistance-type.dto';

@Controller('technical-assistance-types')
export class TechnicalAssistanceTypeController {
  constructor(private readonly technicalAssistanceTypeService: TechnicalAssistanceTypeService) {}

  @Post()
  create(@Body() createTechnicalAssistanceTypeDto: CreateTechnicalAssistanceTypeDto) {
    return this.technicalAssistanceTypeService.create(createTechnicalAssistanceTypeDto);
  }

  @Get()
  findAll() {
    return this.technicalAssistanceTypeService.findAll();
  }

  @Patch(':name')
  update(@Param('name') name: string, @Body() updateTechnicalAssistanceTypeDto: UpdateTechnicalAssistanceTypeDto) {
    return this.technicalAssistanceTypeService.update(name, updateTechnicalAssistanceTypeDto);
  }

  @Delete(':name')
  remove(@Param('name') name: string) {
    return this.technicalAssistanceTypeService.remove(name);
  }
}
