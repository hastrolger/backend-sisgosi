import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateTerminalLocationDto } from './dto/create-terminal-location.dto';
import { UpdateTerminalLocationDto } from './dto/update-terminal-location.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { TerminalLocation } from './entities/terminal-location.entity';
import { EntityNotFoundError, Repository } from 'typeorm';

@Injectable()
export class TerminalLocationService {
  constructor(
    @InjectRepository(TerminalLocation) private terminalLocationRepository: Repository<TerminalLocation>
  ){}
  async create(createTerminalLocationDto: CreateTerminalLocationDto) {
    try{
      const terminalLocation = await this.terminalLocationRepository.findOne(
        {
          where:
          {
            name: createTerminalLocationDto.name
          }
        }
      )

      if(terminalLocation){
        throw new Error('El estado de terminal ya existe')
      }

      const newTerminalLocation = await this.terminalLocationRepository.create(createTerminalLocationDto)
      return await this.terminalLocationRepository.save(newTerminalLocation)

    } catch (error) {
      console.log(error)
      throw new HttpException(
        'Error al crear la ubicación de terminal',
        HttpStatus.BAD_REQUEST
      )
    }
  }

  async findAll() {
    try{
      return await this.terminalLocationRepository.find()
    } catch (error) {
      console.log(error)
      throw new HttpException(
        'Error al obtener las ubicaciones de terminal',
        HttpStatus.BAD_REQUEST
      )
    }
  }

 async update(terminalLocationName: string, updateTerminalLocationDto: UpdateTerminalLocationDto) {
    try{
      const terminalLocation = await this.terminalLocationRepository.findOne(
        {
          where:
          {
            name: terminalLocationName
          }
        }
      )

      if(!terminalLocation){
        throw new Error('El estado de terminal no existe')
      }

      return await this.terminalLocationRepository.update(terminalLocation.id, {...updateTerminalLocationDto})

    } catch (error) {
      console.log(error)
      throw new HttpException(
        'Error al crear la ubicación de terminal',
        HttpStatus.BAD_REQUEST
      )
    }
  }

  async remove(terminalLocationName: string) {
    try{
      const terminalLocation = await this.terminalLocationRepository.findOneOrFail(
        {
          where:
          {
            name: terminalLocationName
          }
        }
      )

      return this.terminalLocationRepository.softDelete(terminalLocation.id)

    } catch (error) {
      console.log(error)
      if(error instanceof EntityNotFoundError) {
        throw new HttpException(
          'La ubicación de  terminal no existe',
          HttpStatus.NOT_FOUND
        ) 
      } else {
          throw new HttpException(
            'Error al obtener la ubicacióm de terminal',
            HttpStatus.BAD_REQUEST
          )
      }
    }
  }
}
