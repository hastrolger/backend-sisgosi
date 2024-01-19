import { PartialType } from '@nestjs/mapped-types';
import { CreateTerminalModelDto } from './create-terminal-model.dto';

export class UpdateTerminalModelDto extends PartialType(CreateTerminalModelDto) {}
