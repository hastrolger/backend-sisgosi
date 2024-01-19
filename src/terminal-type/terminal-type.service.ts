import { Injectable } from '@nestjs/common';
import { CreateTerminalTypeDto } from './dto/create-terminal-type.dto';
import { UpdateTerminalTypeDto } from './dto/update-terminal-type.dto';

@Injectable()
export class TerminalTypeService {
  create(createTerminalTypeDto: CreateTerminalTypeDto) {
    return 'This action adds a new terminalType';
  }

  findAll() {
    return `This action returns all terminalType`;
  }

  findOne(id: number) {
    return `This action returns a #${id} terminalType`;
  }

  update(id: number, updateTerminalTypeDto: UpdateTerminalTypeDto) {
    return `This action updates a #${id} terminalType`;
  }

  remove(id: number) {
    return `This action removes a #${id} terminalType`;
  }
}
