import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateTerminalPurchaseOrderDto } from './dto/create-terminal-purchase-order.dto';
import { UpdateTerminalPurchaseOrderDto } from './dto/update-terminal-purchase-order.dto';
import { EntityNotFoundError, Repository } from 'typeorm';
import { TerminalPurchaseOrder } from './entities/terminal-purchase-order.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Customer } from 'src/customers/entities/customer.entity';

@Injectable()
export class TerminalPurchaseOrderService {
  constructor(
    @InjectRepository(TerminalPurchaseOrder) private terminalPurchaseOrderRepository: Repository<TerminalPurchaseOrder>,
    @InjectRepository(Customer) private customerRepository: Repository<Customer>
  ){}

  async create(createTerminalPurchaseOrderDto: CreateTerminalPurchaseOrderDto) {
    try{
      const terminalPurchaseOrder = await this.terminalPurchaseOrderRepository.findOne(
        {
          where:
          {
            code: createTerminalPurchaseOrderDto.code
          }
        }
      )

      if(terminalPurchaseOrder){
        throw new HttpException('La orden de compra de terminal ya existe', HttpStatus.BAD_REQUEST)
      }

      const customer = await this.customerRepository.findOneOrFail(
        {
          where:
          {
            name: createTerminalPurchaseOrderDto.customer
          }
        }
      )

      const newTerminalPurchaseOrder = await this.terminalPurchaseOrderRepository.create({...createTerminalPurchaseOrderDto, 
        customer: {id: customer.id}})
      return await this.terminalPurchaseOrderRepository.save(newTerminalPurchaseOrder)
    } catch(error) {
      console.log(error)
      if(error instanceof EntityNotFoundError){
        throw new HttpException(
          'El cliente no existe, no se pudo crear la orden de compra',
          HttpStatus.BAD_REQUEST
        )
      }else {
        throw new HttpException(
          'Error al crear la orden de compra',
          HttpStatus.BAD_REQUEST
        )
      }
    }
  }

  async findAll() {
    try{      
       return await this.terminalPurchaseOrderRepository.find()
    } catch(error) {
      console.log(error)
      throw new HttpException(
        'Error al obtener las ordenes de compra',
        HttpStatus.INTERNAL_SERVER_ERROR
      )
    }
  }


  async update(oderCode: string, updateTerminalPurchaseOrderDto: UpdateTerminalPurchaseOrderDto) {
    try {
      const terminalPurchaseOrder = await this.terminalPurchaseOrderRepository.findOne(
        {
          where:
          {
            code: oderCode
          }
        }
      )

      if(!terminalPurchaseOrder){
        throw new HttpException(
          'La orden de compra de terminal no existe',
          HttpStatus.BAD_REQUEST
        )
      }

       const customer = await this.customerRepository.findOneOrFail(
        {
          where:
          {
            name: updateTerminalPurchaseOrderDto.customer
          }
        }
      )

       return await this.terminalPurchaseOrderRepository.update(terminalPurchaseOrder.id, {
       ...updateTerminalPurchaseOrderDto,
          customer: {id: customer.id}
        })
    }catch(error){
      console.log(error)
      if(error instanceof EntityNotFoundError){
        throw new HttpException(
          'El cliente no existe, no se pudo actualizar la orden de compra',
          HttpStatus.BAD_REQUEST
        )
      } else {
        throw new HttpException(
          'Error al actualizar la orden de compra de terminal',
          HttpStatus.BAD_REQUEST
        )
      }
    }
  }

  async remove(oderCode: string) {
    try {
      const terminalPurchaseOrder = await this.terminalPurchaseOrderRepository.findOneOrFail(
        {
          where:
          {
            code: oderCode
          }
        }
      )

      return await this.terminalPurchaseOrderRepository.softDelete(terminalPurchaseOrder.id)
    } catch(error) {
      console.log(error)
      if(error instanceof EntityNotFoundError){
        throw new HttpException(
          'La orden de compra de terminal no existe',
          HttpStatus.BAD_REQUEST
        )
      } else {
        throw new HttpException(
          'Error al elminiar la orden de compra de terminal',
          HttpStatus.BAD_REQUEST
        )
      }
    }
  }
}
