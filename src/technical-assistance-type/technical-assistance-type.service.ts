import { Injectable } from '@nestjs/common';
import { CreateTechnicalAssistanceTypeDto } from './dto/create-technical-assistance-type.dto';
import { UpdateTechnicalAssistanceTypeDto } from './dto/update-technical-assistance-type.dto';

@Injectable()
export class TechnicalAssistanceTypeService {
  create(createTechnicalAssistanceTypeDto: CreateTechnicalAssistanceTypeDto) {
    return 'This action adds a new technicalAssistanceType';
  }

  findAll() {
    return `This action returns all technicalAssistanceType`;
  }

  findOne(id: number) {
    return `This action returns a #${id} technicalAssistanceType`;
  }

  update(id: number, updateTechnicalAssistanceTypeDto: UpdateTechnicalAssistanceTypeDto) {
    return `This action updates a #${id} technicalAssistanceType`;
  }

  remove(id: number) {
    return `This action removes a #${id} technicalAssistanceType`;
  }
}
