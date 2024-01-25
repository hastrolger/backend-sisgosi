import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { TechnicalAssistanceService } from './technical-assistance.service';
import { CreateTechnicalAssistanceDto } from './dto/create-technical-assistance.dto';
import { UpdateTechnicalAssistanceDto } from './dto/update-technical-assistance.dto';

@Controller('technical-assistance')
export class TechnicalAssistanceController {
  constructor(private readonly technicalAssistanceService: TechnicalAssistanceService) {}

  @Post()
  create(@Body() createTechnicalAssistanceDto: CreateTechnicalAssistanceDto) {
    return this.technicalAssistanceService.create(createTechnicalAssistanceDto);
  }

  @Get()
  findAll() {
    return this.technicalAssistanceService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.technicalAssistanceService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTechnicalAssistanceDto: UpdateTechnicalAssistanceDto) {
    return this.technicalAssistanceService.update(+id, updateTechnicalAssistanceDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.technicalAssistanceService.remove(+id);
  }
}
