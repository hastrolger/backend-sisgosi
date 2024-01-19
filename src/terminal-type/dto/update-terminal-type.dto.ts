import { PartialType } from '@nestjs/mapped-types';
import { CreateTerminalTypeDto } from './create-terminal-type.dto';

export class UpdateTerminalTypeDto extends PartialType(CreateTerminalTypeDto) {}
