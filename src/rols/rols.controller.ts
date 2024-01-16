import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { RolsService } from './rols.service';
import { CreateRolDto } from './dto/create-rol.dto';

@Controller('rols')
export class RolsController {
    constructor(private rolsService: RolsService){}

    @Get()
    findAll() {
        return this.rolsService.findAll();
    }

    @Get(':rolName')
    findOneBy(@Param('rolName') rolName: string) {
        return this.rolsService.findOneBy(rolName);
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
