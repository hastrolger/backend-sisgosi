import { Injectable } from '@nestjs/common';
import { CreateRegionDto } from './dto/create-region.dto';
import { UpdateRegionDto } from './dto/update-region.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Region } from './entities/region.entity';
import { Repository } from 'typeorm';

@Injectable()
export class RegionsService {
  constructor(
    @InjectRepository(Region) private regionRepository: Repository<Region>,
  ) {}

  async create(createRegionDto: CreateRegionDto) {
    let region: any
    try {
      region = await this.regionRepository.findOne(
        {
          where:
          {
            name: createRegionDto.name
          }
        }
      )
    } catch {
      (err) => console.log(err);
      throw new Error('Error al crear la región')
    }

    if(!region) {
      const newRegion = await this.regionRepository.create(createRegionDto);
      return await this.regionRepository.save(newRegion);
    } else {
      return 'La región ya existe'
    }

  }

  async findAll() {
    try {
      return await this.regionRepository.find();
    } catch {
      (err) => console.log(err);
      throw new Error('Error al obtener las regiones')
    }
  }

  async findOne(regionName: string) {
    let region: any;
    try {
      region = await this.regionRepository.findOne({
        where: {
          name: regionName,
        },
      });
    } catch {
      (err) => console.log(err);
      throw new Error('Error al obtener la región')
    }

    if (region) {
      return region;
    } else {
      return 'Región no encontrada';
    }
  }

  async update(regionName: string, updateRegionDto: UpdateRegionDto) {
    let region: any
    try {
      region = await this.regionRepository.findOne(
        {
          where: {
            name: regionName,
          }
        } 
      )
    } catch {
      (err) => console.log(err);
      throw new Error('Error al eliminar la región')
    }

    if(region){
      return await this.regionRepository.update((await region).id, updateRegionDto);
    } else {
      return 'La región no existe'
    }
  }

  async remove(regionName: string) {
    let region: any
    try {
      region = await this.regionRepository.findOne(
        {
          where: {
            name: regionName,
          }
        } 
      )
    } catch {
      (err) => console.log(err);
      throw new Error('Error al eliminar la región')
    }

    if(region){
      return await this.regionRepository.softDelete((await region).id);
    } else {
      return 'Región no encontrada'
    }
  }
}
