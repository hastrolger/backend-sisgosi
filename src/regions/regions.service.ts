import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateRegionDto } from './dto/create-region.dto';
import { UpdateRegionDto } from './dto/update-region.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Region } from './entities/region.entity';
import { EntityNotFoundError, Repository } from 'typeorm';

@Injectable()
export class RegionsService {
  constructor(
    @InjectRepository(Region) private regionRepository: Repository<Region>,
  ) { }

  async create(createRegionDto: CreateRegionDto) {
    try {
      const region = await this.regionRepository.findOne(
        {
          where:
          {
            name: createRegionDto.name
          }
        }
      )

      if (region) {
        throw new HttpException(
          'La región ya existe',
          HttpStatus.BAD_REQUEST,
        );
      }
      const newRegion = await this.regionRepository.create(createRegionDto);
      return await this.regionRepository.save(newRegion);
    } catch (error) {
      console.log(error);
      throw new Error('Error al crear la región');
    }
  }

  async findAll() {
    try {
      return await this.regionRepository.find();
    } catch (error){
       console.log(error)
      throw new Error('Error al obtener las regiones')
    }
  }

  async findOne(regionName: string) {
    try {
      return await this.regionRepository.findOneOrFail({
        where: {
          name: regionName,
        },
      });
    }catch (error) {
        console.log(error);
        if (error instanceof EntityNotFoundError) {
          throw new HttpException(
            'La región no existe',
            HttpStatus.BAD_REQUEST,
          );
        } else {
          throw new Error('Error al obtener la región');
        }
      }
  }

  async update(regionName: string, updateRegionDto: UpdateRegionDto) {
    try {
      const region = await this.regionRepository.findOneOrFail(
        {
          where: {
            name: regionName,
          }
        }
      )
      return await this.regionRepository.update((await region).id, updateRegionDto);
  } catch (error) {
    console.log(error);
    if (error instanceof EntityNotFoundError) {
      throw new HttpException(
        'La región no existe',
        HttpStatus.BAD_REQUEST,
      );
    } else {
      throw new Error('Error al actualizar la región');
    }
  }
  }

  async remove(regionName: string) {
    try {
      const region = await this.regionRepository.findOneOrFail(
        {
          where: {
            name: regionName,
          }
        }
      )
      return await this.regionRepository.softDelete((await region).id);
    } catch (error) {
      console.log(error);
      if (error instanceof EntityNotFoundError) {
        throw new HttpException(
          'La región no existe',
          HttpStatus.BAD_REQUEST,
        );
      } else {
        throw new Error('Error al eliminar la región');
      }
    }
  }
}
