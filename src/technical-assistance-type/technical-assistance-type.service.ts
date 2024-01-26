import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateTechnicalAssistanceTypeDto } from './dto/create-technical-assistance-type.dto';
import { UpdateTechnicalAssistanceTypeDto } from './dto/update-technical-assistance-type.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { TechnicalAssistanceType } from './entities/technical-assistance-type.entity';
import { EntityNotFoundError, Repository } from 'typeorm';

@Injectable()
export class TechnicalAssistanceTypeService {
  constructor(
    @InjectRepository(TechnicalAssistanceType) private technicalAssistanceTypeRepository: Repository<TechnicalAssistanceType>,
  ){}

  async create(createTechnicalAssistanceTypeDto: CreateTechnicalAssistanceTypeDto) {
    try {
      const technicalAssistanceType = await this.technicalAssistanceTypeRepository.findOne(
        {
          where:
          {
            name: createTechnicalAssistanceTypeDto.name
          }
        }
      )

      if(technicalAssistanceType){
        throw new HttpException(
          'El tipo de asistencia técnica ya existe',
          HttpStatus.BAD_REQUEST
        )
      }

      const newTechnicalAssistanceType = await this.technicalAssistanceTypeRepository.create(createTechnicalAssistanceTypeDto)
      return await this.technicalAssistanceTypeRepository.save(newTechnicalAssistanceType)
    } catch(error) {
      console.log(error)
      throw new HttpException(
        'Error al crear el tipo de asistencia técnica',
        HttpStatus.BAD_REQUEST
      )
    }
  }

  async findAll() {
    try{
      return await this.technicalAssistanceTypeRepository.find()
    } catch(error) {
      console.log(error)
      throw new HttpException(
        'Error al obtener los tipos de asistencias técnicas',
        HttpStatus.INTERNAL_SERVER_ERROR
      )
    }
  }

  async update(technicalAssistanceTypeName: string, updateTechnicalAssistanceTypeDto: UpdateTechnicalAssistanceTypeDto) {
    try {
      const technicalAssistanceType = await this.technicalAssistanceTypeRepository.findOne(
        {
          where:
          {
            name: technicalAssistanceTypeName
          }
        }
      )

      if(!technicalAssistanceType){
        throw new HttpException(
          'El tipo de asistencia técnica no existe',
          HttpStatus.BAD_REQUEST
        )
      }

      return await this.technicalAssistanceTypeRepository.update(technicalAssistanceType.id, 
        {...updateTechnicalAssistanceTypeDto})
      
    } catch(error) {
      console.log(error)
      throw new HttpException(
          'Error al obtener los tipos de asistencias técnicas',
          HttpStatus.INTERNAL_SERVER_ERROR
        )
      
    }
  }

  async remove(technicalAssistanceTypeName: string) {
    try {
      const technicalAssistanceType = await this.technicalAssistanceTypeRepository.findOneOrFail(
        {
          where:
          {
            name: technicalAssistanceTypeName
          }
        }
      )

      return await this.technicalAssistanceTypeRepository.softDelete(technicalAssistanceType.id)
      
    } catch(error) {
      console.log(error)
      if(error instanceof EntityNotFoundError){
        throw new HttpException(
          'El tipo de asistencia técnica no existe',
          HttpStatus.BAD_REQUEST
        )
      } else {
        throw new HttpException(
          'Error al eliminar el tipo de asistencia técnica',
          HttpStatus.INTERNAL_SERVER_ERROR
        )
      }     
    }
  }}
