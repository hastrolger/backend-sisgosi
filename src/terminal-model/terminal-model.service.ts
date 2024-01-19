import { Injectable } from '@nestjs/common';
import { CreateTerminalModelDto } from './dto/create-terminal-model.dto';
import { UpdateTerminalModelDto } from './dto/update-terminal-model.dto';

@Injectable()
export class TerminalModelService {
  create(createTerminalModelDto: CreateTerminalModelDto) {
    return 'This action adds a new terminalModel';
  }

  findAll() {
    return `This action returns all terminalModel`;
  }

  findOne(terminalModelName: string) {
    return 
  }

  update(terminalModelName: string, updateTerminalModelDto: UpdateTerminalModelDto) {
    return 
  }

  remove(terminalModelName: string) {
    return 
  }
}
