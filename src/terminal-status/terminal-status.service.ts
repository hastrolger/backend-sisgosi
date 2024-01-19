import { Injectable } from '@nestjs/common';
import { CreateTerminalStatusDto } from './dto/create-terminal-status.dto';
import { UpdateTerminalStatusDto } from './dto/update-terminal-status.dto';

@Injectable()
export class TerminalStatusService {
  create(createTerminalStatusDto: CreateTerminalStatusDto) {
    return 'This action adds a new terminalStatus';
  }

  findAll() {
    return `This action returns all terminalStatus`;
  }

  findOne(id: number) {
    return `This action returns a #${id} terminalStatus`;
  }

  update(id: number, updateTerminalStatusDto: UpdateTerminalStatusDto) {
    return `This action updates a #${id} terminalStatus`;
  }

  remove(id: number) {
    return `This action removes a #${id} terminalStatus`;
  }
}
