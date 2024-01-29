import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { InternalTechnicalAssistanceTypeService } from './internal-technical-assistance-type.service';
import { CreateInternalTechnicalAssistanceTypeDto } from './dto/create-internal-technical-assistance-type.dto';
import { UpdateInternalTechnicalAssistanceTypeDto } from './dto/update-internal-technical-assistance-type.dto';

@Controller('internal-technical-assistance-types')
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

  @Patch(':name')
  update(@Param('name') name: string, @Body() updateInternalTechnicalAssistanceTypeDto: UpdateInternalTechnicalAssistanceTypeDto) {
    return this.internalTechnicalAssistanceTypeService.update(name, updateInternalTechnicalAssistanceTypeDto);
  }

  @Delete(':name')
  remove(@Param('name') name: string) {
    return this.internalTechnicalAssistanceTypeService.remove(name);
  }
}
