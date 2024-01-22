import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { StateService } from './state.service';
import { CreateStateDto } from './dto/create-state.dto';
import { UpdateStateDto } from './dto/update-state.dto';

@Controller('states')
export class StateController {
  constructor(private readonly statesService: StateService) {}

  @Post()
  create(@Body() createStateDto: CreateStateDto) {
    return this.statesService.create(createStateDto);
  }

  @Get()
  findAll() {
    return this.statesService.findAll();
  }

  @Patch(':state')
  update(@Param('state') state: string, @Body() updateStateDto: UpdateStateDto) {
    return this.statesService.update(state, updateStateDto);
  }

  @Delete(':state')
  remove(@Param('state') state: string) {
    return this.statesService.remove(state);
  }
}
