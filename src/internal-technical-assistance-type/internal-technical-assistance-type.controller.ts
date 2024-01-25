import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { InternalTechnicalAssistanceTypeService } from './internal-technical-assistance-type.service';
import { CreateInternalTechnicalAssistanceTypeDto } from './dto/create-internal-technical-assistance-type.dto';
import { UpdateInternalTechnicalAssistanceTypeDto } from './dto/update-internal-technical-assistance-type.dto';

@Controller('internal-technical-assistance-type')
export class InternalTechnicalAssistanceTypeController {
  constructor(private readonly internalTechnicalAssistanceTypeService: InternalTechnicalAssistanceTypeService) {}

  @Post()
  create(@Body() createInternalTechnicalAssistanceTypeDto: CreateInternalTechnicalAssistanceTypeDto) {
    return this.internalTechnicalAssistanceTypeService.create(createInternalTechnicalAssistanceTypeDto);
  }

  @Get()
  findAll() {
    return this.internalTechnicalAssistanceTypeService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.internalTechnicalAssistanceTypeService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateInternalTechnicalAssistanceTypeDto: UpdateInternalTechnicalAssistanceTypeDto) {
    return this.internalTechnicalAssistanceTypeService.update(+id, updateInternalTechnicalAssistanceTypeDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.internalTechnicalAssistanceTypeService.remove(+id);
  }
}
