import { PartialType } from '@nestjs/mapped-types';
import { CreateTechnicalAssistanceDto } from './create-technical-assistance.dto';

export class UpdateTechnicalAssistanceDto extends PartialType(CreateTechnicalAssistanceDto) {}
