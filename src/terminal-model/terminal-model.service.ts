import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateTerminalModelDto } from './dto/create-terminal-model.dto';
import { UpdateTerminalModelDto } from './dto/update-terminal-model.dto';
import { EntityNotFoundError, Repository } from 'typeorm';
import { TerminalModel } from './entities/terminal-model.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { TerminalVendor } from 'src/terminal-vendor/entities/terminal-vendor.entity';

@Injectable()
export class TerminalModelService {
  constructor(
    @InjectRepository(TerminalModel) private terminalModelRepository: Repository<TerminalModel>,
    @InjectRepository(TerminalVendor) private terminalVendorRepository: Repository<TerminalVendor>
  ) { }

  async create(createTerminalModelDto: CreateTerminalModelDto) {
    try {
      const terminalModel = await this.terminalModelRepository.findOne(
        {
          where: {
            name: createTerminalModelDto.name
          }
        }
      )

      if (terminalModel) {
        throw new HttpException(
          'El modelo ya existe',
          HttpStatus.BAD_REQUEST
        )
      }

      const terminalVendor = await this.terminalVendorRepository.findOneOrFail(
        {
          where:
          {
            name: createTerminalModelDto.terminalVendor
          }
        }
      )

      const newTerminalModel = await this.terminalModelRepository.create({
        ...createTerminalModelDto,
        terminalVendor: { id: terminalVendor.id }
      })
      return await this.terminalModelRepository.save(newTerminalModel)

    } catch (error) {
      console.log(error)
      if (error instanceof EntityNotFoundError) {
        throw new HttpException(
          'El proveedor no existe',
          HttpStatus.BAD_REQUEST
        )
      } else {
        throw new Error('Error al crear el modelo')
      }
    }
  }

  async findAll() {
    try {
      return await this.terminalModelRepository.find()
    } catch (error) {
      throw new Error('Error al obtener los modelos')
    }
  }

  async update(terminalModelName: string, updateTerminalModelDto: UpdateTerminalModelDto) {
    try {
      const terminalModel = await this.terminalModelRepository.findOne(
        {
          where:
          {
            name: terminalModelName
          }
        }
      )

      if (!terminalModel) {
        throw new HttpException(
          'El modelo no existe',
          HttpStatus.BAD_REQUEST
        )
      }

      const terminalVendor = await this.terminalVendorRepository.findOneOrFail(
        {
          where:
          {
            name: updateTerminalModelDto.terminalVendor
          }
        }
      )

      return await this.terminalModelRepository.update(terminalModel.id, {
        ...updateTerminalModelDto,
        terminalVendor: { id: terminalVendor.id }
        
      })
      
    } catch (error) {
      if (error instanceof EntityNotFoundError) {
        throw new HttpException(
          'El modelo no existe',
          HttpStatus.BAD_REQUEST
        )
      } else {
        throw new Error('Error al actualizar el modelo')
      }
    }
  }

  async remove(terminalModelName: string) {
    try {
      const terminalModel = await this.terminalModelRepository.findOneOrFail(
        {
          where:
          {
            name: terminalModelName
          }
        }
      )

      return await this.terminalModelRepository.softDelete(terminalModel.id)
    } catch (error) {
      console.log(error)
      if (error instanceof EntityNotFoundError) {
        throw new HttpException(
          'El modelo no existe',
          HttpStatus.BAD_REQUEST
        )
      } else {
        throw new Error('Error al eliminar el modelo')
    }
  }

  }}