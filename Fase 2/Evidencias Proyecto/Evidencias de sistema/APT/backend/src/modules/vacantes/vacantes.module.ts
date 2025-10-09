import { Module } from '@nestjs/common';
import { VacantesService } from './vacantes.service';
import { VacantesController } from './vacantes.controller';

@Module({
  controllers: [VacantesController],
  providers: [VacantesService],
  exports: [VacantesService],
})
export class VacantesModule {}
