import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { RegionsService } from './regions.service';
import { CreateRegionDto } from './dto/create-region.dto';
import { UpdateRegionDto } from './dto/update-region.dto';

@Controller('regions')
export class RegionsController {
  constructor(private readonly regionsService: RegionsService) {}

  @Post()
  create(@Body() createRegionDto: CreateRegionDto) {
    return this.regionsService.create(createRegionDto);
  }

  @Get()
  findAll() {
    return this.regionsService.findAll();
  }

  @Get(':region')
  findOne(@Param('region') region: string) {
    return this.regionsService.findOne(region);
  }

  @Patch(':region')
  update(@Param('region') region: string, @Body() updateRegionDto: UpdateRegionDto) {
    return this.regionsService.update(region, updateRegionDto);
  }

  @Delete(':region')
  remove(@Param('region') region: string) {
    return this.regionsService.remove(region);
  }
}
