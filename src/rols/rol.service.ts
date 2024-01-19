import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Rol } from './entities/rols.entity';
import { EntityNotFoundError, Repository } from 'typeorm';
import { CreateRolDto } from './dto/create-rol.dto';
import { UpdateRolDto } from './dto/update-rol.dto';

@Injectable()
export class RolService {
  constructor(
    @InjectRepository(Rol) private rolRepository: Repository<Rol>,
  ) { }

  async create(createRolDto: CreateRolDto) {
    try {
      const rol = await this.rolRepository.findOne(
        {
          where:
          {
            name: createRolDto.name
          }
        }
      )

      if (rol) {
        throw new HttpException(
          'El rol ya existe',
          HttpStatus.BAD_REQUEST
        );
      }
      const newRol = await this.rolRepository.create(createRolDto)
      return await this.rolRepository.save(newRol)

    } catch (error) {
      console.log(error);
      throw new Error('Error al crear el rol')

    }
  }

  async findAll(): Promise<Rol[]> {
    try {
      return await this.rolRepository.find();
    } catch (err) {
      console.log(err)
      throw new Error('Error al obtener los roles')
    }
  }

  async update(rolName: string, updateRolDto: UpdateRolDto) {
    try {
      const rol = await this.rolRepository.findOneOrFail({
        where: { name: rolName },
      })

      return await this.rolRepository.update((await rol).id, updateRolDto);
    } catch (error) {
      console.log(error)
      if (error instanceof EntityNotFoundError) {
        throw new HttpException(
          'El rol no existe',
          HttpStatus.BAD_REQUEST,
        );
      } else {
        throw new Error('Error al obtener el rol');
      }
    }
  }

  async remove(rolName: string) {
    try {
      const rol = await this.rolRepository.findOneOrFail({
        where: { name: rolName },
      });

      return await this.rolRepository.softDelete((await rol).id);
    } catch (error) {
      console.log(error);
      if (error instanceof EntityNotFoundError) {
        throw new HttpException(
          'El rol no existe',
          HttpStatus.BAD_REQUEST,
        );
      } else {
        throw new Error('Error al obtener el rol');
      }
    }
  }
}
