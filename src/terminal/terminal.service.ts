import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateTerminalDto } from './dto/create-terminal.dto';
import { UpdateTerminalDto } from './dto/update-terminal.dto';
import { Terminal } from './entities/terminal.entity';
import { EntityNotFoundError, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { TerminalVendor } from 'src/terminal-vendor/entities/terminal-vendor.entity';
import { TerminalModel } from 'src/terminal-model/entities/terminal-model.entity';
import { TerminalType } from 'src/terminal-type/entities/terminal-type.entity';
import { TerminalLocation } from 'src/terminal-location/entities/terminal-location.entity';
import { TerminalStatus } from 'src/terminal-status/entities/terminal-status.entity';
import { TerminalPurchaseOrder } from 'src/terminal-purchase-order/entities/terminal-purchase-order.entity';
import { Region } from 'src/regions/entities/region.entity';
import { State } from 'src/states/entities/state.entity';
import { City } from 'src/cities/entities/city.entity';
import { Customer } from 'src/customers/entities/customer.entity';

@Injectable()
export class TerminalService {
  constructor(
    @InjectRepository(Terminal)
    private terminalRepository: Repository<Terminal>,
    @InjectRepository(TerminalVendor)
    private terminalVendorRepository: Repository<TerminalVendor>,
    @InjectRepository(TerminalModel)
    private terminalModelRepository: Repository<TerminalModel>,
    @InjectRepository(TerminalType)
    private terminalTypeRepository: Repository<TerminalType>,
    @InjectRepository(TerminalLocation)
    private terminalLocationRepository: Repository<TerminalLocation>,
    @InjectRepository(TerminalStatus)
    private terminalStatusRepository: Repository<TerminalStatus>,
    @InjectRepository(TerminalPurchaseOrder)
    private terminalPurchaseOrderRepository: Repository<TerminalPurchaseOrder>,
    @InjectRepository(Region) private regionRepository: Repository<Region>,
    @InjectRepository(State) private stateRepository: Repository<State>,
    @InjectRepository(City) private cityRepository: Repository<City>,
    @InjectRepository(Customer)
    private customerRepository: Repository<Customer>,
  ) {}

  async create(createTerminalDto: CreateTerminalDto) {
    try {
      const terminal = await this.terminalRepository.findOne({
        where: {
          code: createTerminalDto.code,
        },
      });

      if (terminal) {
        throw new HttpException(
          'El terminal ya existe',
          HttpStatus.BAD_REQUEST,
        );
      }

      const customer = await this.customerRepository.findOneOrFail({
        where: {
          name: createTerminalDto.customer,
        },
      });

      const terminalVendor = await this.terminalVendorRepository.findOneOrFail({
        where: {
          name: createTerminalDto.terminalVendor,
        },
      });

      const terminalModel = await this.terminalModelRepository.findOneOrFail({
        where: {
          name: createTerminalDto.terminalModel,
        },
      });

      const terminalType = await this.terminalTypeRepository.findOneOrFail({
        where: {
          name: createTerminalDto.terminalType,
        },
      });

      const terminalStatus = await this.terminalStatusRepository.findOneOrFail({
        where: {
          name: createTerminalDto.terminalStatus,
        },
      });

      const terminalLocation =
        await this.terminalLocationRepository.findOneOrFail({
          where: {
            name: createTerminalDto.terminalLocation,
          },
        });

      const region = await this.regionRepository.findOneOrFail({
        where: {
          name: createTerminalDto.region,
        },
      });

      const state = await this.stateRepository.findOneOrFail({
        where: {
          name: createTerminalDto.state,
        },
      });

      const city = await this.cityRepository.findOneOrFail({
        where: {
          name: createTerminalDto.city,
        },
      });

      const purchaseOrder =
        await this.terminalPurchaseOrderRepository.findOneOrFail({
          where: {
            code: createTerminalDto.purchaseOrder,
          },
        });

      const newTerminal = await this.terminalRepository.create({
        ...createTerminalDto,
        customer: { id: customer.id },
        terminalVendor: { id: terminalVendor.id },
        terminalModel: { id: terminalModel.id },
        terminalType: { id: terminalType.id },
        terminalStatus: { id: terminalStatus.id },
        terminalLocation: { id: terminalLocation.id },
        region: { id: region.id },
        state: { id: state.id },
        city: { id: city.id },
        purchaseOrder: { id: purchaseOrder.id },
      });

      return await this.terminalRepository.save(newTerminal);
    } catch (error) {
      console.log(error);
      if (error instanceof EntityNotFoundError) {
        throw new HttpException(
          'Uno o más datos relacionados al terminal no existen',
          HttpStatus.BAD_REQUEST,
        );
      } else {
        throw new HttpException(
          'Error al crear el terminal',
          HttpStatus.BAD_REQUEST,
        );
      }
    }
  }

  async findAll() {
    try {
      return await this.terminalRepository.find();
    } catch (error) {
      console.log(error);
      throw new HttpException(
        'Error al obtener los terminales',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async findOne(terminalCode: string) {
    try {
      const terminal = await this.terminalRepository.findOneOrFail({
        where: {
          code: terminalCode,
        },
      });

      return terminal;
    } catch (error) {
      console.log(error);
      if (error instanceof EntityNotFoundError) {
        throw new HttpException(
          'El terminal no existe',
          HttpStatus.BAD_REQUEST,
        );
      } else {
        throw new HttpException(
          'Error al obtener el terminal',
          HttpStatus.BAD_REQUEST,
        );
      }
    }
  }

  async update(terminalCode: string, updateTerminalDto: UpdateTerminalDto) {
    try {
      const terminal = await this.terminalRepository.findOne({
        where: {
          code: updateTerminalDto.code,
        },
      });

      if (!terminal) {
        throw new HttpException(
          'El terminal no existe',
          HttpStatus.BAD_REQUEST,
        );
      }

      const customer = await this.customerRepository.findOneOrFail({
        where: {
          name: updateTerminalDto.customer,
        },
      });

      const terminalVendor = await this.terminalVendorRepository.findOneOrFail({
        where: {
          name: updateTerminalDto.terminalVendor,
        },
      });

      const terminalModel = await this.terminalModelRepository.findOneOrFail({
        where: {
          name: updateTerminalDto.terminalModel,
        },
      });

      const terminalType = await this.terminalTypeRepository.findOneOrFail({
        where: {
          name: updateTerminalDto.terminalType,
        },
      });

      const terminalStatus = await this.terminalStatusRepository.findOneOrFail({
        where: {
          name: updateTerminalDto.terminalStatus,
        },
      });

      const terminalLocation =
        await this.terminalLocationRepository.findOneOrFail({
          where: {
            name: updateTerminalDto.terminalLocation,
          },
        });

      const region = await this.regionRepository.findOneOrFail({
        where: {
          name: updateTerminalDto.region,
        },
      });

      const state = await this.stateRepository.findOneOrFail({
        where: {
          name: updateTerminalDto.state,
        },
      });

      const city = await this.cityRepository.findOneOrFail({
        where: {
          name: updateTerminalDto.city,
        },
      });

      const purchaseOrder =
        await this.terminalPurchaseOrderRepository.findOneOrFail({
          where: {
            code: updateTerminalDto.purchaseOrder,
          },
        });

      return await this.terminalRepository.update(terminal.id, {
        ...updateTerminalDto,
        customer: { id: customer.id },
        terminalVendor: { id: terminalVendor.id },
        terminalModel: { id: terminalModel.id },
        terminalType: { id: terminalType.id },
        terminalStatus: { id: terminalStatus.id },
        terminalLocation: { id: terminalLocation.id },
        region: { id: region.id },
        state: { id: state.id },
        city: { id: city.id },
        purchaseOrder: { id: purchaseOrder.id },
      });
    } catch (error) {
      console.log(error);
      if (error instanceof EntityNotFoundError) {
        throw new HttpException(
          'Uno o más datos relacionados al terminal no existen',
          HttpStatus.BAD_REQUEST,
        );
      } else {
        throw new HttpException(
          'Error al actualizar el terminal',
          HttpStatus.BAD_REQUEST,
        );
      }
    }
  }

  async remove(terminalCode: string) {
    try {
      const terminal = await this.terminalRepository.findOneOrFail({
        where: {
          code: terminalCode,
        },
      });

      return await this.terminalRepository.softDelete(terminal.id);
    } catch (error) {
      console.log(error);
      if (error instanceof EntityNotFoundError) {
        throw new HttpException(
          'El terminal no existe',
          HttpStatus.BAD_REQUEST,
        );
      } else {
        throw new HttpException(
          'Error al eliminar el terminal',
          HttpStatus.BAD_REQUEST,
        );
      }
    }
  }
}
