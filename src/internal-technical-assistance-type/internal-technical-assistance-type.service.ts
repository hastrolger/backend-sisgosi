import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateInternalTechnicalAssistanceTypeDto } from './dto/create-internal-technical-assistance-type.dto';
import { UpdateInternalTechnicalAssistanceTypeDto } from './dto/update-internal-technical-assistance-type.dto';
import { EntityNotFoundError, Repository } from 'typeorm';
import { InternalTechnicalAssistanceType } from './entities/internal-technical-assistance-type.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { TechnicalAssistanceType } from 'src/technical-assistance-type/entities/technical-assistance-type.entity';

@Injectable()
export class InternalTechnicalAssistanceTypeService {
  constructor(
    @InjectRepository(InternalTechnicalAssistanceType) private internalTechnicalAssistanceTypeRepository: Repository<InternalTechnicalAssistanceType>,
    @InjectRepository(TechnicalAssistanceType) private technicalAssistanceTypeRepository: Repository<TechnicalAssistanceType>
  ){}

  async create(createInternalTechnicalAssistanceTypeDto: CreateInternalTechnicalAssistanceTypeDto) {
    try{
      const internalTechnicalAssistanceType = await this.internalTechnicalAssistanceTypeRepository.findOne(
        {
          where: {
            name: createInternalTechnicalAssistanceTypeDto.name
          }
        }
      )

      if(internalTechnicalAssistanceType){
        throw new HttpException(
          'El tipo de asistencia técnica interna ya existe',
          HttpStatus.BAD_REQUEST
        )
      }

      const technicalAssistanceType = await this.technicalAssistanceTypeRepository.findOneOrFail(
        {
          where: {
            name: createInternalTechnicalAssistanceTypeDto.technicalAssistanceType
          }
        }
      )

      const newInternalTechnicalAssistanceType = await this.internalTechnicalAssistanceTypeRepository.create({...createInternalTechnicalAssistanceTypeDto, 
        technicalAssistanceType: {id: technicalAssistanceType.id}})
      return await this.internalTechnicalAssistanceTypeRepository.save(newInternalTechnicalAssistanceType)

    } catch(error) {
      console.log(error)
      if(error instanceof EntityNotFoundError){
        throw new HttpException(
          'El tipo de asistencia técnica no existe',
          HttpStatus.BAD_REQUEST
        )
      }else {
        throw new HttpException(
          'Error al crear el tipo de asistencia técnica interna',
          HttpStatus.BAD_REQUEST
        )
      }
    }
  }

  async findAll() {
    try {
      return await this.internalTechnicalAssistanceTypeRepository.find()
    } catch(error) {
      throw new HttpException(
        'Error al obtener los tipos de asistencias técnicas internas',
        HttpStatus.BAD_REQUEST
      )
    }
  }

  async update(internalTechnicalAssistanceTypeName: string, updateInternalTechnicalAssistanceTypeDto: UpdateInternalTechnicalAssistanceTypeDto) {
    try{
      const internalTechnicalAssistanceType = await this.internalTechnicalAssistanceTypeRepository.findOne(
        {
          where: {
            name: internalTechnicalAssistanceTypeName
          }
        }
      )

      if(!internalTechnicalAssistanceType){
        throw new HttpException(
          'El tipo de asistencia técnica interna no existe',
          HttpStatus.BAD_REQUEST
        )
      }

      const technicalAssistanceType = await this.technicalAssistanceTypeRepository.findOneOrFail(
        {
          where: {
            name: updateInternalTechnicalAssistanceTypeDto.technicalAssistanceType
          }
        }
      )

      return await this.internalTechnicalAssistanceTypeRepository.update(internalTechnicalAssistanceType.id, 
        {...updateInternalTechnicalAssistanceTypeDto, technicalAssistanceType: {id: technicalAssistanceType.id}})
      
    } catch(error) {
      console.log(error)
      if(error instanceof EntityNotFoundError){
        throw new HttpException(
          'El tipo de asistencia técnica no existe',
          HttpStatus.BAD_REQUEST
        )
      }else {
        throw new HttpException(
          'Error al actualizar el tipo de asistencia técnica interna',
          HttpStatus.BAD_REQUEST
        )
      }
    }
  }

  async remove(internalTechnicalAssistanceTypeName: string) {
    try {
      const internalTechnicalAssistanceType = await this.internalTechnicalAssistanceTypeRepository.findOneOrFail(
        {
          where: {
            name: internalTechnicalAssistanceTypeName
          }
        }
      )

      return await this.internalTechnicalAssistanceTypeRepository.softDelete(internalTechnicalAssistanceType.id)
    } catch (error) {
      console.log(error)
      if(error instanceof EntityNotFoundError){
        throw new HttpException(
          'El tipo de asistencia técnica interna no existe',
          HttpStatus.BAD_REQUEST
        )
      } else {
        throw new HttpException(
          'Error al eliminar el tipo de asistencia técnica interna',
          HttpStatus.BAD_REQUEST
        )
      }
    }
  }
}
