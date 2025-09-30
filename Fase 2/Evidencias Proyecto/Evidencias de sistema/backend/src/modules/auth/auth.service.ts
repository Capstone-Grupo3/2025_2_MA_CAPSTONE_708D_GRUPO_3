import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../../common/database/prisma.service';
import { LoginDto } from './dto/login.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
  ) {}

  async login(loginDto: LoginDto) {
    const { correo, password } = loginDto;

    // Buscar reclutador por correo
    const recruiter = await this.prisma.recruiter.findUnique({
      where: { correo },
    });

    if (!recruiter) {
      throw new UnauthorizedException('Credenciales inválidas');
    }

    // Verificar contraseña
    const isPasswordValid = await bcrypt.compare(password, recruiter.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Credenciales inválidas');
    }

    // Verificar que el reclutador esté activo
    if (!recruiter.activo) {
      throw new UnauthorizedException('Cuenta desactivada');
    }

    // Generar token JWT
    const payload = { 
      sub: recruiter.id, 
      correo: recruiter.correo, 
      rol: recruiter.rol 
    };

    return {
      access_token: this.jwtService.sign(payload),
      user: {
        id: recruiter.id,
        nombreCompleto: recruiter.nombreCompleto,
        correo: recruiter.correo,
        rol: recruiter.rol,
      },
    };
  }

  async validateUser(payload: any) {
    const recruiter = await this.prisma.recruiter.findUnique({
      where: { id: payload.sub },
    });

    if (!recruiter || !recruiter.activo) {
      throw new UnauthorizedException();
    }

    return recruiter;
  }
}