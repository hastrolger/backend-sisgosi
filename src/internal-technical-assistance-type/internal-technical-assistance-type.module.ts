import { Module } from '@nestjs/common';
import { InternalTechnicalAssistanceTypeService } from './internal-technical-assistance-type.service';
import { InternalTechnicalAssistanceTypeController } from './internal-technical-assistance-type.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { InternalTechnicalAssistanceType } from './entities/internal-technical-assistance-type.entity';
import { TechnicalAssistanceType } from 'src/technical-assistance-type/entities/technical-assistance-type.entity';

@Module({
  imports: [TypeOrmModule.forFeature([InternalTechnicalAssistanceType, TechnicalAssistanceType])],
  controllers: [InternalTechnicalAssistanceTypeController],
  providers: [InternalTechnicalAssistanceTypeService],
})
export class InternalTechnicalAssistanceTypeModule {}
