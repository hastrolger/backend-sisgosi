import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { TechnicalAssistanceTypeService } from './technical-assistance-type.service';
import { CreateTechnicalAssistanceTypeDto } from './dto/create-technical-assistance-type.dto';
import { UpdateTechnicalAssistanceTypeDto } from './dto/update-technical-assistance-type.dto';

@Controller('technical-assistance-type')
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

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.technicalAssistanceTypeService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTechnicalAssistanceTypeDto: UpdateTechnicalAssistanceTypeDto) {
    return this.technicalAssistanceTypeService.update(+id, updateTechnicalAssistanceTypeDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.technicalAssistanceTypeService.remove(+id);
  }
}
