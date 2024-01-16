import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Rols } from './entities/rols.entity';
import { Repository } from 'typeorm';
import { CreateRolDto } from './dto/create-rol.dto';

@Injectable()
export class RolsService {
    constructor(@InjectRepository(Rols) private rolsRespository: Repository<Rols>) { }

    async findAll(): Promise<Rols[]> {
        return await this.rolsRespository.find();
    }

    async findOneBy(rolName: string) {
        return this.rolsRespository.findOne(
            {
                where: 
                {name: rolName}
            }
        )
    }

    async create(createRolDto: CreateRolDto) {
        const newRol = this.rolsRespository.create(createRolDto)
        return await this.rolsRespository.save(newRol)
    }

    async delete(rolName: string) {
        const rolID = this.rolsRespository.findOne(
            {
                where: 
                {name: rolName}
            }
        )
        
        return await this.rolsRespository.softDelete((await rolID).id)
    }
}
