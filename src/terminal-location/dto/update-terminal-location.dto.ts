import { PartialType } from '@nestjs/mapped-types';
import { CreateTerminalLocationDto } from './create-terminal-location.dto';

export class UpdateTerminalLocationDto extends PartialType(CreateTerminalLocationDto) {}
