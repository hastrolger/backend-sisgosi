import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateCityDto } from './dto/create-city.dto';
import { UpdateCityDto } from './dto/update-city.dto';
import { City } from './entities/city.entity';
import { State } from 'src/states/entities/state.entity';
import { EntityMetadataNotFoundError, EntityNotFoundError, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class CityService {
  constructor(
    @InjectRepository(State) private stateRepository: Repository<State>,
    @InjectRepository(City) private cityRepository: Repository<City>,
  ) { }

  async create(createCityDto: CreateCityDto) {
    try {
      const city = await this.cityRepository.findOne({
        where: {
          name: createCityDto.name,
        },
      });

      if (city) {
        throw new HttpException(
          'La ciudad ya existe',
          HttpStatus.NOT_FOUND,
        );
      }

      const state = await this.stateRepository.findOneOrFail({
        where: {
          name: createCityDto.state,
        },
      });

      createCityDto.state = (await state).id;
      const newCity = await this.cityRepository.create({
        ...createCityDto,
        state: { id: (await state).id },
      });

      return await this.cityRepository.save(newCity);
    } catch (error) {
      console.log(error);
      if (error instanceof EntityMetadataNotFoundError) {
        throw new HttpException(
          'El estado no existe, ciudad no creada',
          HttpStatus.BAD_REQUEST,
        );
      } else {
        throw new Error('Error al obtener los datos');
      }
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
    try {
      return await this.cityRepository.findOneOrFail({
        where: {
          name: cityName,
        },
      });
    } catch (error) {
      console.log(error);
      if (error instanceof EntityMetadataNotFoundError) {
        throw new HttpException(
          'El estado no existe',
          HttpStatus.BAD_REQUEST,
        );
      } else {
        throw new Error('Error al obtener los datos');
      }
    }
  }

  async update(cityName: string, updateCityDto: UpdateCityDto) {
    try {
      const city = await this.cityRepository.findOne({
        where: {
          name: cityName,
        },
      });


      if (!city) {
        throw new HttpException(
          'La ciudad no existe',
          HttpStatus.BAD_REQUEST,
        );
      }

      const state = await this.stateRepository.findOne({
        where: {
          name: updateCityDto.state
        },
      });

      /**
       * update state
       */
      updateCityDto.state = (await state).id;
      return await this.cityRepository.update((await city).id, {
        ...updateCityDto,
        state: { id: (await state).id },
      });
    } catch (error) {
      console.log(error);
      if (error instanceof EntityNotFoundError) {
        throw new HttpException(
          'La provincia no existe, ciudad no creada',
          HttpStatus.BAD_REQUEST,
        );
      } else {
        throw new Error('Error al actualizar la ciudad');
      }
    }

  }

  async remove(stateName: string) {
    try {
      const city = await this.cityRepository.findOneOrFail({
        where: {
          name: stateName,
        },
      });

      return await this.cityRepository.softDelete((await city).id);
    } catch (error) {
      console.log(error);
      if (error instanceof EntityNotFoundError) {
        throw new HttpException(
          'La ciudad no existe',
          HttpStatus.BAD_REQUEST,
        );
      } else {
        throw new Error('Error al eliminar la ciudad');
      }
    }
  }
}
