import { Injectable } from '@nestjs/common';
import { CreateTerminalDto } from './dto/create-terminal.dto';
import { UpdateTerminalDto } from './dto/update-terminal.dto';
import { Terminal } from './entities/terminal.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class TerminalService {
  constructor(
    @InjectRepository(Terminal) private terminalRepository: Repository<Terminal>
  ) {}

  create(createTerminalDto: CreateTerminalDto) {
    return 'This action adds a new terminal';
  }

  findAll() {
    return `This action returns all terminal`;
  }

  findOne(code: string) {
    return 
  }

  update(code: string, updateTerminalDto: UpdateTerminalDto) {
    return 
  }

  remove(code: string) {
    return
  }
}
