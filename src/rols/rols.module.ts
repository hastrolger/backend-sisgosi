import { Module } from '@nestjs/common';
import { RolsController } from './rols.controller';
import { RolsService } from './rols.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Rol } from './entities/rols.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Rol])],
  controllers: [RolsController],
  providers: [RolsService],
  exports: [RolsService]
})
export class RolsModule {}
