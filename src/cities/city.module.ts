import { Module } from '@nestjs/common';
import { CityService } from './city.service';
import { CityController } from './city.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { City } from './entities/city.entity';
import { State } from 'src/states/entities/state.entity';

@Module({
  imports: [TypeOrmModule.forFeature([City, State])],
  controllers: [CityController],
  providers: [CityService],
})
export class CityModule {}
