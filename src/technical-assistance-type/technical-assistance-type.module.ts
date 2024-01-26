import { Module } from '@nestjs/common';
import { TechnicalAssistanceTypeService } from './technical-assistance-type.service';
import { TechnicalAssistanceTypeController } from './technical-assistance-type.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TechnicalAssistanceType } from './entities/technical-assistance-type.entity';

@Module({
  imports: [TypeOrmModule.forFeature([TechnicalAssistanceType])],
  controllers: [TechnicalAssistanceTypeController],
  providers: [TechnicalAssistanceTypeService],
})
export class TechnicalAssistanceTypeModule {}
