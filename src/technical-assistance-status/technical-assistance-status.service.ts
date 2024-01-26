import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateTechnicalAssistanceStatusDto } from './dto/create-technical-assistance-status.dto';
import { UpdateTechnicalAssistanceStatusDto } from './dto/update-technical-assistance-status.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { TechnicalAssistanceStatus } from './entities/technical-assistance-status.entity';
import { EntityNotFoundError, Repository } from 'typeorm';

@Injectable()
export class TechnicalAssistanceStatusService {
  constructor(
    @InjectRepository(TechnicalAssistanceStatus) private technicalAssistanceStatusRepository: Repository<TechnicalAssistanceStatus>,
  ){}

  async create(createTechnicalAssistanceStatusDto: CreateTechnicalAssistanceStatusDto) {
    try {
      const technicalAssistanceStatus = await this.technicalAssistanceStatusRepository.findOne(
        {
          where:
          {
            name: createTechnicalAssistanceStatusDto.name
          }
        }
      )

      if(technicalAssistanceStatus){
        throw new HttpException(
          'El estado de asistencia técnica ya existe',
          HttpStatus.BAD_REQUEST
        )
      }

      const newTechnicalAssistanceStatus = await this.technicalAssistanceStatusRepository.create(createTechnicalAssistanceStatusDto)
      return await this.technicalAssistanceStatusRepository.save(newTechnicalAssistanceStatus)
    } catch(error) {
      console.log(error)
      throw new HttpException(
        'Error al crear el estado de asistencia técnica',
        HttpStatus.BAD_REQUEST
      )
    }
  }

  async findAll() {
    try{
      return await this.technicalAssistanceStatusRepository.find()
    } catch(error) {
      console.log(error)
      throw new HttpException(
        'Error al obtener los estados de asistencias técnicas',
        HttpStatus.INTERNAL_SERVER_ERROR
      )
    }
  }

  async update(technicalAssistanceStatusName: string, updateTechnicalAssistanceStatusDto: UpdateTechnicalAssistanceStatusDto) {
    try {
      const technicalAssistanceStatus = await this.technicalAssistanceStatusRepository.findOne(
        {
          where:
          {
            name: technicalAssistanceStatusName
          }
        }
      )

      if(!technicalAssistanceStatus){
        throw new HttpException(
          'El estado de asistencia técnica no existe',
          HttpStatus.BAD_REQUEST
        )
      }

      return await this.technicalAssistanceStatusRepository.update(technicalAssistanceStatus.id, 
        {...updateTechnicalAssistanceStatusDto})
      
    } catch(error) {
      console.log(error)
      throw new HttpException(
          'Error al obtener los estados de asistencias técnicas',
          HttpStatus.INTERNAL_SERVER_ERROR
        )
      
    }
  }

  async remove(technicalAssistanceStatusName: string) {
    try {
      const technicalAssistanceStatus = await this.technicalAssistanceStatusRepository.findOneOrFail(
        {
          where:
          {
            name: technicalAssistanceStatusName
          }
        }
      )

      return await this.technicalAssistanceStatusRepository.softDelete(technicalAssistanceStatus.id)
      
    } catch(error) {
      console.log(error)
      if(error instanceof EntityNotFoundError){
        throw new HttpException(
          'El estado de asistencia técnica no existe',
          HttpStatus.BAD_REQUEST
        )
      } else {
        throw new HttpException(
          'Error al eliminar el estado de asistencia técnica',
          HttpStatus.INTERNAL_SERVER_ERROR
        )
      }     
    }
  }
}
