import { Module } from '@nestjs/common';
import { CandidatosService } from './candidatos.service';
import { CandidatosController } from './candidatos.controller';

@Module({
  controllers: [CandidatosController],
  providers: [CandidatosService],
  exports: [CandidatosService],
})
export class CandidatosModule {}
