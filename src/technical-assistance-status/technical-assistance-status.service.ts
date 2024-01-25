import { Injectable } from '@nestjs/common';
import { CreateTechnicalAssistanceStatusDto } from './dto/create-technical-assistance-status.dto';
import { UpdateTechnicalAssistanceStatusDto } from './dto/update-technical-assistance-status.dto';

@Injectable()
export class TechnicalAssistanceStatusService {
  create(createTechnicalAssistanceStatusDto: CreateTechnicalAssistanceStatusDto) {
    return 'This action adds a new technicalAssistanceStatus';
  }

  findAll() {
    return `This action returns all technicalAssistanceStatus`;
  }

  findOne(id: number) {
    return `This action returns a #${id} technicalAssistanceStatus`;
  }

  update(id: number, updateTechnicalAssistanceStatusDto: UpdateTechnicalAssistanceStatusDto) {
    return `This action updates a #${id} technicalAssistanceStatus`;
  }

  remove(id: number) {
    return `This action removes a #${id} technicalAssistanceStatus`;
  }
}
