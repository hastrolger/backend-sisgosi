import { Module } from '@nestjs/common';
import { TechnicalAssistanceService } from './technical-assistance.service';
import { TechnicalAssistanceController } from './technical-assistance.controller';

@Module({
  controllers: [TechnicalAssistanceController],
  providers: [TechnicalAssistanceService],
})
export class TechnicalAssistanceModule {}
