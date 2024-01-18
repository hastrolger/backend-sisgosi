import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Rol } from './entities/rols.entity';
import { Repository } from 'typeorm';
import { CreateRolDto } from './dto/create-rol.dto';
import { UpdateRolDto } from './dto/update-rol.dto';

@Injectable()
export class RolService {
  constructor(
    @InjectRepository(Rol) private rolRepository: Repository<Rol>,
  ) {}

  async create(createRolDto: CreateRolDto) {
    let rol: any
    try {
      rol = await this.rolRepository.findOne(
        {
          where:
            {
              name: createRolDto.name
            }
        }
      )
    } catch {
      (err) => console.log(err)
      throw new Error('Error al crear el rol')
    }

    if(!rol) {
      const newRol = await this.rolRepository.create(createRolDto);
      return await this.rolRepository.save(newRol);
    } else {
      return 'El rol ya existe'
    }
  }


  async findAll(): Promise<Rol[]> {
    try{
      return await this.rolRepository.find();
    } catch {
      (err) => console.log(err);
      throw new Error('Error al obtener los roles')
    }
  }


  async update(rolName: string, updateRolDto: UpdateRolDto) {
    let rol: any
    try {
      rol = await this.rolRepository.findOne({
        where: { name: rolName },
      });
      
    } catch{
      (err) => console.log(err)
      throw new Error('Error al actualizar el rol')
    }

    if(rol){
      return await this.rolRepository.update((await rol).id, updateRolDto);
    } else {
      return 'Rol no encontrado'
    }
  }

  async delete(rolName: string) {
    try {
      const rol = await this.rolRepository.findOne({
        where: { name: rolName },
      });
  
      return await this.rolRepository.softDelete((await rol).id);
    } catch {
      (err) => console.log(err)
      throw new Error('Error al eliminar el rol')
    }
  }
}
