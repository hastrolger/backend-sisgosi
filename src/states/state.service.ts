import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateStateDto } from './dto/create-state.dto';
import { UpdateStateDto } from './dto/update-state.dto';
import { State } from './entities/state.entity';
import { Region } from '../regions/entities/region.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class StateService {
  constructor(
    @InjectRepository(State) private stateRepository: Repository<State>,
    @InjectRepository(Region) private regionRepository: Repository<Region>,
  ) {}

  async create(createStateDto: CreateStateDto) {
   /**
     * get city by cityRepository to validate if exists
     */
   let state: any;
   try {
    state = await this.stateRepository.findOne({
       where: {
         name: createStateDto.name,
       },
     });
   } catch {
     (err) => console.log(err);
     throw new Error('Error al obtener la provincia');
   }

   if (!state) {
     let region: any;
     try {
       region = await this.regionRepository.findOne({
         where: {
           name: createStateDto.region,
         },
       });
     } catch {
       (err) => console.log(err);
       throw new Error('Error al obtener la provincia');
     }

     if (region) {
      createStateDto.region = (await region).id;
       const newState = await this.stateRepository.create({
         ...createStateDto,
         region: { id: (await region).id },
       });
       return await this.stateRepository.save(newState);
     } else {
       throw new HttpException(
         'La región no existe, provincia no creada',
         HttpStatus.BAD_REQUEST,
       );
     }
   } else {
       throw new HttpException(
         'La provincia ya existe',
         HttpStatus.NOT_FOUND,
       );
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
    let state: any;
    try {
      state = await this.stateRepository.findOne({
        where: {
          name: stateName,
        },
      });
    } catch {
      (err) => console.log(err);
      throw new Error('Error al obtener la provincia');
    }

    if (state) {
      return state;
    } else {
      return 'Provincia no encontrada';
    }
  }

  async update(stateName: string, updateStateDto: UpdateStateDto) {
    /**
     * get state by stateRepository
     */
    let state: any;
    try {
      state = await this.stateRepository.findOne({
        where: {
          name: stateName,
        },
      });
    } catch {
      (err) => console.log(err);
      throw new Error('Error al obtener la provincia');
    }

    if (state) {
      /**
       * get region by regionRepository
       */
      let region: any;
      try {
        region = await this.regionRepository.findOne({
          where: {
            name: updateStateDto.region,
          },
        });
      } catch {
        (err) => console.log(err);
        throw new Error('Error al obtener la región');
      }

      if (region) {
        /**
         * update state
         */
        updateStateDto.region = (await region).id;
        return await this.stateRepository.update((await state).id, {
          ...updateStateDto,
          region: { id: (await region).id },
        });
      }
    } else {
      throw new HttpException('La provincia no existe', HttpStatus.BAD_REQUEST);
    }
  }

  async remove(stateName: string) {
    let state: any;
    try {
      state = await this.stateRepository.findOne({
        where: {
          name: stateName,
        },
      });
    } catch {
      (err) => console.log(err);
      throw new Error('Error al eliminar la provincia');
    }

    if (state) {
      return await this.stateRepository.softDelete((await state).id);
    } else {
      return 'Provincia no encontrada';
    }
  }
}
