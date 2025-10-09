import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from './common/prisma/prisma.module';
import { AuthModule } from './modules/auth/auth.module';
import { EmpresasModule } from './modules/empresas/empresas.module';
import { CandidatosModule } from './modules/candidatos/candidatos.module';
import { VacantesModule } from './modules/vacantes/vacantes.module';
import { PostulacionesModule } from './modules/postulaciones/postulaciones.module';
import { IaModule } from './modules/ia/ia.module';
import { StorageModule } from './modules/storage/storage.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    PrismaModule,
    AuthModule,
    EmpresasModule,
    CandidatosModule,
    VacantesModule,
    PostulacionesModule,
    IaModule,
    StorageModule,
  ],
})
export class AppModule {}
