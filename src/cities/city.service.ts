import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateCityDto } from './dto/create-city.dto';
import { UpdateCityDto } from './dto/update-city.dto';
import { City } from './entities/city.entity';
import { State } from 'src/states/entities/state.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class CityService {
  constructor(
    @InjectRepository(State) private stateRepository: Repository<State>,
    @InjectRepository(City) private cityRepository: Repository<City>,
  ) { }

  async create(createCityDto: CreateCityDto) {
    /**
     * get city by cityRepository to validate if exists
     */
    let city: any;
    try {
      city = await this.cityRepository.findOne({
        where: {
          name: createCityDto.name,
        },
      });
    } catch {
      (err) => console.log(err);
      throw new Error('Error al obtener la ciudad');
    }

    if (!city) {
      let state: any;
      try {
        state = await this.stateRepository.findOne({
          where: {
            name: createCityDto.state,
          },
        });
      } catch {
        (err) => console.log(err);
        throw new Error('Error al obtener la provincia');
      }

      if (state) {
        createCityDto.state = (await state).id;
        const newCity = await this.cityRepository.create({
          ...createCityDto,
          state: { id: (await state).id },
        });
        return await this.stateRepository.save(newCity);
      } else {
        throw new HttpException(
          'La provincia no existe, ciudad no creada',
          HttpStatus.BAD_REQUEST,
        );
      }
    } else {
        throw new HttpException(
          'La ciudad ya existe',
          HttpStatus.NOT_FOUND,
        );
    }
  }


  async findAll() {
      try {
        return await this.cityRepository.find();
      } catch {
        (err) => console.log(err);
        throw new Error('Error al obtener las ciudades');
      }
    }

  async findOne(cityName: string) {
      let city: any;
      try {
        city = await this.cityRepository.findOne({
          where: {
            name: cityName,
          },
        });
      } catch {
        (err) => console.log(err);
        throw new Error('Error al obtener la ciudad');
      }

      if (city) {
        return city;
      } else {
        return 'Provincia no encontrada';
      }
    }

  async update(cityName: string, updateCityDto: UpdateCityDto) {
      /**
       * get state by stateRepository
       */
      let city: any;
      try {
        city = await this.cityRepository.findOne({
          where: {
            name: cityName,
          },
        });
      } catch {
        (err) => console.log(err);
        throw new Error('Error al obtener la ciudad');
      }

      if (city) {
        /**
         * get region by regionRepository
         */
        let state: any;
        try {
          state = await this.stateRepository.findOne({
            where: {
              name: updateCityDto.state
            },
          });
        } catch {
          (err) => console.log(err);
          throw new Error('Error al obtener la provincia');
        }

        if (state) {
          /**
           * update state
           */
          updateCityDto.state = (await state).id;
          return await this.cityRepository.update((await city).id, {
            ...updateCityDto,
            state: { id: (await state).id },
          });
        }
      } else {
        throw new HttpException('La ciudad no existe', HttpStatus.BAD_REQUEST);
      }
    }

  async remove(stateName: string) {
      let city: any;
      try {
        city = await this.cityRepository.findOne({
          where: {
            name: stateName,
          },
        });
      } catch {
        (err) => console.log(err);
        throw new Error('Error al eliminar la región');
      }

      if (city) {
        return await this.cityRepository.softDelete((await city).id);
      } else {
        return 'Ciudad no encontrada';
      }
    }
  }
