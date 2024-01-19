import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateStateDto } from './dto/create-state.dto';
import { UpdateStateDto } from './dto/update-state.dto';
import { State } from './entities/state.entity';
import { Region } from '../regions/entities/region.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityNotFoundError, Repository } from 'typeorm';

@Injectable()
export class StateService {
  constructor(
    @InjectRepository(State) private stateRepository: Repository<State>,
    @InjectRepository(Region) private regionRepository: Repository<Region>,
  ) { }

  async create(createStateDto: CreateStateDto) {
    try {
      const state = await this.stateRepository.findOne({
        where: {
          name: createStateDto.name,
        },
      });

      if (state) {
        throw new HttpException(
          'La provincia ya existe',
          HttpStatus.BAD_REQUEST,
        );
      }

      const region = await this.regionRepository.findOneOrFail({
        where: {
          name: createStateDto.region,
        },
      });

      createStateDto.region = (await region).id;
      const newState = await this.stateRepository.create({
        ...createStateDto,
        region: { id: (await region).id },
      });

      return await this.stateRepository.save(newState);
    } catch (error) {
      console.log(error);
      if (error instanceof EntityNotFoundError) {
        throw new HttpException(
          'La región no existe, provincia no creada',
          HttpStatus.BAD_REQUEST,
        );
      } else {
        throw new Error('Error al crear el estado');
      }
    }
  }

  async findAll() {
    try {
      return await this.stateRepository.find();
    } catch {
      (err) => console.log(err);
      throw new Error('Error al obtener las provincias');
    }
  }

  async findOne(stateName: string) {
    try {
      return await this.stateRepository.findOneOrFail({
        where: {
          name: stateName,
        }
      })

    } catch (error) {
      console.log(error);
      if (error instanceof EntityNotFoundError) {
        throw new HttpException(
          'La provincia no existe',
          HttpStatus.BAD_REQUEST,
        );
      } else {
        throw new Error('Error al obtener la provincia');
      }
    }
  }

  async update(stateName: string, updateStateDto: UpdateStateDto) {
    try {
      const state = await this.stateRepository.findOne({
        where: {
          name: stateName,
        },
      });

      if (!state) {
        throw new HttpException(
          'La provincia no existe',
          HttpStatus.BAD_REQUEST,
        );
      }

      const region = await this.regionRepository.findOneOrFail({
        where: {
          name: updateStateDto.region,
        },
      });

      updateStateDto.region = (await region).id;
      return await this.stateRepository.update((await state).id, {
        ...updateStateDto,
        region: { id: (await region).id },
      });
    } catch (error) {
      console.log(error);
      if (error instanceof EntityNotFoundError) {
        throw new HttpException(
          'La región no existe, provincia no actualizada',
          HttpStatus.BAD_REQUEST,
        );
      } else {
        throw new Error('Error al actualizar el estado');
      }
    }
  }

  async remove(stateName: string) {
    try {
     const state = await this.stateRepository.findOneOrFail({
        where: {
          name: stateName,
        },
      })

      return await this.stateRepository.softDelete((await state).id);
    } catch (error) {
      console.log(error);
      if (error instanceof EntityNotFoundError) {
        throw new HttpException(
          'El estado no existe',
          HttpStatus.BAD_REQUEST,
        );
      } else {
        throw new Error('Error al obtener el estado');
      }
    }
  }
}
