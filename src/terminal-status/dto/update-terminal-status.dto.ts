import { PartialType } from '@nestjs/mapped-types';
import { CreateTerminalStatusDto } from './create-terminal-status.dto';

export class UpdateTerminalStatusDto extends PartialType(CreateTerminalStatusDto) {}
