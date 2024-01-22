import {  HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateTerminalVendorDto } from './dto/create-terminal-vendor.dto';
import { UpdateTerminalVendorDto } from './dto/update-terminal-vendor.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { TerminalVendor } from './entities/terminal-vendor.entity';
import { EntityNotFoundError, Repository } from 'typeorm';

@Injectable()
export class TerminalVendorService {
  constructor(
    @InjectRepository(TerminalVendor) private terminalVendorRepository: Repository<TerminalVendor>
  ) {}
  
  async create(createTerminalVendorDto: CreateTerminalVendorDto) {
    try {
      const terminalVendor = await this.terminalVendorRepository.findOne(
        {
          where: {
            name: createTerminalVendorDto.name
          }
        }
      )

      if(terminalVendor){
        throw new HttpException(
          'El proverdor ya existe',
          HttpStatus.BAD_REQUEST
        )
      }

      const newTerminalVendor = await this.terminalVendorRepository.create(createTerminalVendorDto)
      return this.terminalVendorRepository.save(newTerminalVendor)

    } catch (error) {
      console.log(error)
      throw new Error('Error al crear el proveedor')
    }
  }

  async findAll() {
    try {
      return await this.terminalVendorRepository.find();
    } catch (error) {
      console.log(error)
      throw new Error('Error al obtener los proveedores')
    }
  }  

  async update(terminalVendorName: string, updateTerminalVendorDto: UpdateTerminalVendorDto) {
    try {
      const terminalVendor = await this.terminalVendorRepository.findOne(
        {
          where: {
            name: terminalVendorName
          }
        }
      )
      
      if(!terminalVendor){
        throw new HttpException(
          'El proveedor no existe',
          HttpStatus.BAD_REQUEST
        )
      }

      return await this.terminalVendorRepository.update(terminalVendor.id, {...updateTerminalVendorDto})
    } catch (error) {
      console.log(error)
      if(error instanceof EntityNotFoundError){
        throw new HttpException(
          'El proveedor no existe',
          HttpStatus.BAD_REQUEST
        )
      } else {
        throw new Error('Error al actualizar el proveedor')
      }
    }
  }

  async remove(terminalVendorName: string) {
    try {
      const terminalVendor = await this.terminalVendorRepository.findOneOrFail(
        {
          where: {
            name: terminalVendorName
          }
        }
      )
      return await this.terminalVendorRepository.softDelete(terminalVendor.id)
    } catch (error) {
      console.log(error)
      if(error instanceof EntityNotFoundError){
        throw new HttpException(
          'El proveedor no existe',
          HttpStatus.BAD_REQUEST
        ) 
      } else {
          throw new Error('Error al obtener el proveedor')
        }
      }
  }
}
