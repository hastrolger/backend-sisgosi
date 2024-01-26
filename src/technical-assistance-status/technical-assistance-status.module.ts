import { Module } from '@nestjs/common';
import { TechnicalAssistanceStatusService } from './technical-assistance-status.service';
import { TechnicalAssistanceStatusController } from './technical-assistance-status.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TechnicalAssistanceStatus } from './entities/technical-assistance-status.entity';

@Module({
  imports: [TypeOrmModule.forFeature([TechnicalAssistanceStatus])],
  providers: [TechnicalAssistanceStatusService],
  controllers: [TechnicalAssistanceStatusController],
  exports: [TypeOrmModule],
})
export class TechnicalAssistanceStatusModule {}
