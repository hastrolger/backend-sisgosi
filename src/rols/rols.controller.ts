import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { RolsService } from './rols.service';
import { CreateRolDto } from './dto/create-rol.dto';
import { UpdateRolDto } from './dto/update-rol.dto';

@Controller('rols')
export class RolsController {
    constructor(private rolsService: RolsService){}

    @Get()
    findAll() {
        return this.rolsService.findAll();
    }

    @Patch(':rolName')
    update(@Param('rolName') rolName: string, @Body() updateRolDto: UpdateRolDto) {
        return this.rolsService.update(rolName, updateRolDto)
    }

    @Post()
    create(@Body() createRolDto: CreateRolDto) {
        return this.rolsService.create(createRolDto)   
    }

    @Delete(':rolName')
    delete(@Param('rolName') rolName: string) {
        console.log(rolName)
        return this.rolsService.delete(rolName)
    }

}
