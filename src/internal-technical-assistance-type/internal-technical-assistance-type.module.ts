import { Module } from '@nestjs/common';
import { InternalTechnicalAssistanceTypeService } from './internal-technical-assistance-type.service';
import { InternalTechnicalAssistanceTypeController } from './internal-technical-assistance-type.controller';

@Module({
  controllers: [InternalTechnicalAssistanceTypeController],
  providers: [InternalTechnicalAssistanceTypeService],
})
export class InternalTechnicalAssistanceTypeModule {}
