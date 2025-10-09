import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { EmpresasService } from '../empresas/empresas.service';
import { CandidatosService } from '../candidatos/candidatos.service';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private empresasService: EmpresasService,
    private candidatosService: CandidatosService,
  ) {}

  async loginEmpresa(loginDto: LoginDto) {
    const empresa = await this.empresasService.findByEmail(loginDto.correo);

    if (
      !empresa ||
      !(await bcrypt.compare(loginDto.contrasena, empresa.contrasenaHash))
    ) {
      throw new UnauthorizedException('Credenciales inválidas');
    }

    const payload = { sub: empresa.id, email: empresa.correo, tipo: 'empresa' };

    return {
      access_token: this.jwtService.sign(payload),
      user: {
        id: empresa.id,
        nombre: empresa.nombre,
        correo: empresa.correo,
        tipo: 'empresa',
      },
    };
  }

  async loginCandidato(loginDto: LoginDto) {
    const candidato = await this.candidatosService.findByEmail(loginDto.correo);

    if (
      !candidato ||
      !(await bcrypt.compare(loginDto.contrasena, candidato.contrasenaHash))
    ) {
      throw new UnauthorizedException('Credenciales inválidas');
    }

    const payload = {
      sub: candidato.id,
      email: candidato.correo,
      tipo: 'candidato',
    };

    return {
      access_token: this.jwtService.sign(payload),
      user: {
        id: candidato.id,
        nombre: candidato.nombre,
        correo: candidato.correo,
        tipo: 'candidato',
      },
    };
  }

  async validateUser(userId: number, tipo: string) {
    if (tipo === 'empresa') {
      return this.empresasService.findOne(userId);
    } else if (tipo === 'candidato') {
      return this.candidatosService.findOne(userId);
    }
    return null;
  }
}
