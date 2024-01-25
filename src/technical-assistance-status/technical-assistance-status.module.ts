import { Module } from '@nestjs/common';
import { TechnicalAssistanceStatusService } from './technical-assistance-status.service';
import { TechnicalAssistanceStatusController } from './technical-assistance-status.controller';

@Module({
  controllers: [TechnicalAssistanceStatusController],
  providers: [TechnicalAssistanceStatusService],
})
export class TechnicalAssistanceStatusModule {}
