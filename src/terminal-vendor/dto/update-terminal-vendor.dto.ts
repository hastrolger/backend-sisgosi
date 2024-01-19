import { PartialType } from '@nestjs/mapped-types';
import { CreateTerminalVendorDto } from './create-terminal-vendor.dto';

export class UpdateTerminalVendorDto extends PartialType(CreateTerminalVendorDto) {}
