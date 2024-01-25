import { PartialType } from '@nestjs/mapped-types';
import { CreateInternalTechnicalAssistanceTypeDto } from './create-internal-technical-assistance-type.dto';

export class UpdateInternalTechnicalAssistanceTypeDto extends PartialType(CreateInternalTechnicalAssistanceTypeDto) {}
