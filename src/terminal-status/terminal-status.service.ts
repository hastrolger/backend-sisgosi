import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateTerminalStatusDto } from './dto/create-terminal-status.dto';
import { UpdateTerminalStatusDto } from './dto/update-terminal-status.dto';
import { EntityNotFoundError, Repository } from 'typeorm';
import { TerminalStatus } from './entities/terminal-status.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class TerminalStatusService {
  constructor(
    @InjectRepository(TerminalStatus) private terminalStatusRepository: Repository<TerminalStatus>
  ){}

  async create(createTerminalStatusDto: CreateTerminalStatusDto) {
    try{
      const terminalStatus = await this.terminalStatusRepository.findOne(
        {
          where:
          {
            name: createTerminalStatusDto.name
          }
        }
      )

      if(terminalStatus){
        throw new Error('El estado de terminal ya existe')
      }

      const newTerminalStatus = await this.terminalStatusRepository.create(createTerminalStatusDto)
      return await this.terminalStatusRepository.save(newTerminalStatus)

    } catch (error) {
      console.log(error)
      throw new HttpException(
        'Error al crear el estado de terminal',
        HttpStatus.BAD_REQUEST
      )
    }
  }

  async findAll() {
    try{
      return await this.terminalStatusRepository.find()
    } catch (error) {
      console.log(error)
      throw new HttpException(
        'Error al obtener los estados de terminal',
        HttpStatus.BAD_REQUEST
      )
    }
  }

 async update(terminalStatusName: string, updateTerminalStatusDto: UpdateTerminalStatusDto) {
    try{
      const terminalStatus = await this.terminalStatusRepository.findOne(
        {
          where:
          {
            name: terminalStatusName
          }
        }
      )

      if(!terminalStatus){
        throw new Error('El estado de terminal no existe')
      }

      return await this.terminalStatusRepository.update(terminalStatus.id, {...updateTerminalStatusDto})

    } catch (error) {
      console.log(error)
      throw new HttpException(
        'Error al crear el estado de terminal',
        HttpStatus.BAD_REQUEST
      )
    }
  }

  async remove(terminalStatusName: string) {
    try{
      const terminalStatus = await this.terminalStatusRepository.findOneOrFail(
        {
          where:
          {
            name: terminalStatusName
          }
        }
      )

      return this.terminalStatusRepository.softDelete(terminalStatus.id)

    } catch (error) {
      console.log(error)
      if(error instanceof EntityNotFoundError) {
        throw new HttpException(
          'El estado de  terminal no existe',
          HttpStatus.NOT_FOUND
        ) 
      } else {
          throw new HttpException(
            'Error al obtener el estado de terminal',
            HttpStatus.BAD_REQUEST
          )
      }
    }
  }
}
