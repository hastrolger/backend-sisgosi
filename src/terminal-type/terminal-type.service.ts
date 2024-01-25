import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateTerminalTypeDto } from './dto/create-terminal-type.dto';
import { UpdateTerminalTypeDto } from './dto/update-terminal-type.dto';
import { EntityNotFoundError, Repository } from 'typeorm';
import { TerminalType } from './entities/terminal-type.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class TerminalTypeService {
  constructor(
    @InjectRepository(TerminalType) private terminalTypeRepository: Repository<TerminalType>
  ) {}
  async create(createTerminalTypeDto: CreateTerminalTypeDto) {
    try{
      const terminalType = await this.terminalTypeRepository.findOne(
        {
          where:
          {
            name: createTerminalTypeDto.name
          }
        }
      )

      if(terminalType){
        throw new Error('El tipo de terminal ya existe')
      }

      const newTerminalTypes = await this.terminalTypeRepository.create(createTerminalTypeDto)
      return await this.terminalTypeRepository.save(newTerminalTypes)

    } catch (error) {
      console.log(error)
      throw new HttpException(
        'Error al crear el tipo de terminal',
        HttpStatus.BAD_REQUEST
      )
    }
  }

  async findAll() {
    try{
      return await this.terminalTypeRepository.find()
    } catch (error) {
      console.log(error)
      throw new HttpException(
        'Error al obtener los tipos de terminal',
        HttpStatus.BAD_REQUEST
      )
    }
  }

 async update(terminalTypeName: string, updateTerminalStatusDto: UpdateTerminalTypeDto) {
    try{
      const terminalType = await this.terminalTypeRepository.findOne(
        {
          where:
          {
            name: terminalTypeName
          }
        }
      )

      if(!terminalType){
        throw new Error('El estado de terminal no existe')
      }

      return await this.terminalTypeRepository.update(terminalType.id, {...updateTerminalStatusDto})

    } catch (error) {
      console.log(error)
      throw new HttpException(
        'Error al crear el estado de terminal',
        HttpStatus.BAD_REQUEST
      )
    }
  }

  async remove(terminalTypeName: string) {
    try{
      const terminalType = await this.terminalTypeRepository.findOneOrFail(
        {
          where:
          {
            name: terminalTypeName
          }
        }
      )

      return this.terminalTypeRepository.softDelete(terminalType.id)

    } catch (error) {
      console.log(error)
      if(error instanceof EntityNotFoundError) {
        throw new HttpException(
          'El tipo de  terminal no existe',
          HttpStatus.NOT_FOUND
        ) 
      } else {
          throw new HttpException(
            'Error al obtener el tipo de terminal',
            HttpStatus.BAD_REQUEST
          )
      }
    }
  }
}
