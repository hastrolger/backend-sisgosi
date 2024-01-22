import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Customer } from './entities/customer.entity';
import { EntityNotFoundError, Repository } from 'typeorm';

@Injectable()
export class CustomerService {
  constructor(
    @InjectRepository(Customer) private customerRepository: Repository<Customer>
  ) {}
  async create(createCustomerDto: CreateCustomerDto) {
    try {
      const customer = await this.customerRepository.findOne(
        {
          where:
          {
            name: createCustomerDto.name
          }
        }
      )

      if (customer) {
        throw new HttpException(
          'El cliente ya existe',
          HttpStatus.BAD_REQUEST,
        );
      }
      const newCustomer = await this.customerRepository.create(createCustomerDto);
      return await this.customerRepository.save(newCustomer);
    } catch (error) {
      console.log(error);
      throw new Error('Error al crear el cliente');
    }
  }

  async findAll() {
    try {
      return await this.customerRepository.find();
    } catch (error){
       console.log(error)
      throw new Error('Error al obtener los clientes')
    }
  }

  async update(customerName: string, updateCustomerDto: UpdateCustomerDto) {
    try {
      const customer = await this.customerRepository.findOneOrFail(
        {
          where: {
            name: customerName,
          }
        }
      )
      return await this.customerRepository.update(customer.id, updateCustomerDto);
  } catch (error) {
    console.log(error);
    if (error instanceof EntityNotFoundError) {
      throw new HttpException(
        'El cliente no existe',
        HttpStatus.BAD_REQUEST,
      );
    } else {
      throw new Error('Error al actualizar el cliente');
    }
  }
  }

  async remove(customerName: string) {
    try {
      const customer = await this.customerRepository.findOneOrFail(
        {
          where: {
            name: customerName,
          }
        }
      )
      return await this.customerRepository.softDelete(customer.id);
    } catch (error) {
      console.log(error);
      if (error instanceof EntityNotFoundError) {
        throw new HttpException(
          'El cliente no existe',
          HttpStatus.BAD_REQUEST,
        );
      } else {
        throw new Error('Error al eliminar el cliente');
      }
    }
  }
}

