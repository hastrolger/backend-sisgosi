import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { TechnicalAssistanceStatusService } from './technical-assistance-status.service';
import { CreateTechnicalAssistanceStatusDto } from './dto/create-technical-assistance-status.dto';
import { UpdateTechnicalAssistanceStatusDto } from './dto/update-technical-assistance-status.dto';

@Controller('technical-assistance-status')
export class TechnicalAssistanceStatusController {
  constructor(private readonly technicalAssistanceStatusService: TechnicalAssistanceStatusService) {}

  @Post()
  create(@Body() createTechnicalAssistanceStatusDto: CreateTechnicalAssistanceStatusDto) {
    return this.technicalAssistanceStatusService.create(createTechnicalAssistanceStatusDto);
  }

  @Get()
  findAll() {
    return this.technicalAssistanceStatusService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.technicalAssistanceStatusService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTechnicalAssistanceStatusDto: UpdateTechnicalAssistanceStatusDto) {
    return this.technicalAssistanceStatusService.update(+id, updateTechnicalAssistanceStatusDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.technicalAssistanceStatusService.remove(+id);
  }
}
