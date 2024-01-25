import { PartialType } from '@nestjs/mapped-types';
import { CreateTechnicalAssistanceStatusDto } from './create-technical-assistance-status.dto';

export class UpdateTechnicalAssistanceStatusDto extends PartialType(CreateTechnicalAssistanceStatusDto) {}
