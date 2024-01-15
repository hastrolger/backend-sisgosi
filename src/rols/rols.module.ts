import { Module } from '@nestjs/common';
import { RolsController } from './rols.controller';
import { RolsService } from './rols.service';

@Module({
  controllers: [RolsController],
  providers: [RolsService]
})
export class RolsModule {}
