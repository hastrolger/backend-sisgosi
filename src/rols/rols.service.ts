import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Rol } from './entities/rols.entity';
import { Repository } from 'typeorm';
import { CreateRolDto } from './dto/create-rol.dto';
import { UpdateRolDto } from './dto/update-rol.dto';

@Injectable()
export class RolsService {
  constructor(
    @InjectRepository(Rol) private rolsRespository: Repository<Rol>,
  ) {}

  async findAll(): Promise<Rol[]> {
    return await this.rolsRespository.find();
  }

  async findOne(rolName: string) {
    return await this.rolsRespository.findOne({
      where: {
        name: rolName,
      },
    });
  }

  async create(createRolDto: CreateRolDto) {
    const newRol = await this.rolsRespository.create(createRolDto);
    return await this.rolsRespository.save(newRol);
  }

  async update(rolName: string, updateRolDto: UpdateRolDto) {
    const rol = await this.rolsRespository.findOne({
      where: { name: rolName },
    });
    return await this.rolsRespository.update((await rol).id, updateRolDto);
  }

  async delete(rolName: string) {
    const rol = await this.rolsRespository.findOne({
      where: { name: rolName },
    });

    return await this.rolsRespository.softDelete((await rol).id);
  }
}
