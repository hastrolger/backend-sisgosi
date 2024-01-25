import { Injectable } from '@nestjs/common';
import { CreateTechnicalAssistanceDto } from './dto/create-technical-assistance.dto';
import { UpdateTechnicalAssistanceDto } from './dto/update-technical-assistance.dto';

@Injectable()
export class TechnicalAssistanceService {
  create(createTechnicalAssistanceDto: CreateTechnicalAssistanceDto) {
    return 'This action adds a new technicalAssistance';
  }

  findAll() {
    return `This action returns all technicalAssistance`;
  }

  findOne(id: number) {
    return `This action returns a #${id} technicalAssistance`;
  }

  update(id: number, updateTechnicalAssistanceDto: UpdateTechnicalAssistanceDto) {
    return `This action updates a #${id} technicalAssistance`;
  }

  remove(id: number) {
    return `This action removes a #${id} technicalAssistance`;
  }
}
