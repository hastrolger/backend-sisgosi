import { Injectable } from '@nestjs/common';
import { CreateInternalTechnicalAssistanceTypeDto } from './dto/create-internal-technical-assistance-type.dto';
import { UpdateInternalTechnicalAssistanceTypeDto } from './dto/update-internal-technical-assistance-type.dto';

@Injectable()
export class InternalTechnicalAssistanceTypeService {
  create(createInternalTechnicalAssistanceTypeDto: CreateInternalTechnicalAssistanceTypeDto) {
    return 'This action adds a new internalTechnicalAssistanceType';
  }

  findAll() {
    return `This action returns all internalTechnicalAssistanceType`;
  }

  findOne(id: number) {
    return `This action returns a #${id} internalTechnicalAssistanceType`;
  }

  update(id: number, updateInternalTechnicalAssistanceTypeDto: UpdateInternalTechnicalAssistanceTypeDto) {
    return `This action updates a #${id} internalTechnicalAssistanceType`;
  }

  remove(id: number) {
    return `This action removes a #${id} internalTechnicalAssistanceType`;
  }
}
