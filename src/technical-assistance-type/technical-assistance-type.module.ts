import { Module } from '@nestjs/common';
import { TechnicalAssistanceTypeService } from './technical-assistance-type.service';
import { TechnicalAssistanceTypeController } from './technical-assistance-type.controller';

@Module({
  controllers: [TechnicalAssistanceTypeController],
  providers: [TechnicalAssistanceTypeService],
})
export class TechnicalAssistanceTypeModule {}
