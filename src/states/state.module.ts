import { Module } from '@nestjs/common';
import { StateService } from './state.service';
import { StateController } from './state.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { State } from './entities/state.entity';
import { Region } from '../regions/entities/region.entity';

@Module({
  imports: [TypeOrmModule.forFeature([State, Region])],
  controllers: [StateController],
  providers: [StateService],
  exports: [TypeOrmModule],
})
export class StateModule {}
