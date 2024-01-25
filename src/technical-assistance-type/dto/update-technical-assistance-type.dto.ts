import { PartialType } from '@nestjs/mapped-types';
import { CreateTechnicalAssistanceTypeDto } from './create-technical-assistance-type.dto';

export class UpdateTechnicalAssistanceTypeDto extends PartialType(CreateTechnicalAssistanceTypeDto) {}
