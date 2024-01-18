import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CityService } from './city.service';
import { CreateCityDto } from './dto/create-city.dto';
import { UpdateCityDto } from './dto/update-city.dto';

@Controller('cities')
export class CityController {
  constructor(private readonly citiesService: CityService) {}

  @Post()
  create(@Body() createCityDto: CreateCityDto) {
    return this.citiesService.create(createCityDto);
  }

  @Get()
  findAll() {
    return this.citiesService.findAll();
  }

  @Get(':city')
  findOne(@Param('city') city: string) {
    return this.citiesService.findOne(city);
  }

  @Patch(':city')
  update(@Param('city') city: string, @Body() updateCityDto: UpdateCityDto) {
    return this.citiesService.update(city, updateCityDto);
  }

  @Delete(':city')
  remove(@Param('city') city: string) {
    return this.citiesService.remove(city);
  }
}
