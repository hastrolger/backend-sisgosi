import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { TechnicalAssistanceStatusService } from './technical-assistance-status.service';
import { CreateTechnicalAssistanceStatusDto } from './dto/create-technical-assistance-status.dto';
import { UpdateTechnicalAssistanceStatusDto } from './dto/update-technical-assistance-status.dto';

@Controller('technical-assistance-statuses')
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


  @Patch(':name')
  update(@Param('name') name: string, @Body() updateTechnicalAssistanceStatusDto: UpdateTechnicalAssistanceStatusDto) {
    return this.technicalAssistanceStatusService.update(name, updateTechnicalAssistanceStatusDto);
  }

  @Delete(':name')
  remove(@Param('name') name: string) {
    return this.technicalAssistanceStatusService.remove(name);
  }
}
