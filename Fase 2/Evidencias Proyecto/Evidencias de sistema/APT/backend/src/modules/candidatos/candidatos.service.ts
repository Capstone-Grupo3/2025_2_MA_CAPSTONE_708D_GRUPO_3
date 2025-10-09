import {
  Injectable,
  ConflictException,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../../common/prisma/prisma.service';
import { CreateCandidatoDto } from './dto/create-candidato.dto';
import { UpdateCandidatoDto } from './dto/update-candidato.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class CandidatosService {
  constructor(private prisma: PrismaService) {}

  async create(createCandidatoDto: CreateCandidatoDto) {
    const existente = await this.prisma.candidato.findUnique({
      where: { correo: createCandidatoDto.correo },
    });

    if (existente) {
      throw new ConflictException('El correo ya está registrado');
    }

    const hashedPassword = await bcrypt.hash(createCandidatoDto.contrasena, 10);

    const candidato = await this.prisma.candidato.create({
      data: {
        nombre: createCandidatoDto.nombre,
        correo: createCandidatoDto.correo,
        contrasenaHash: hashedPassword,
        telefono: createCandidatoDto.telefono,
        linkedinUrl: createCandidatoDto.linkedinUrl,
        skillsJson: createCandidatoDto.skillsJson,
        experienciaAnios: createCandidatoDto.experienciaAnios,
      },
    });

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { contrasenaHash, ...result } = candidato;
    return result;
  }

  async findAll() {
    return this.prisma.candidato.findMany({
      select: {
        id: true,
        nombre: true,
        correo: true,
        telefono: true,
        cvUrl: true,
        linkedinUrl: true,
        skillsJson: true,
        experienciaAnios: true,
        fechaRegistro: true,
        estado: true,
      },
    });
  }

  async findOne(id: number) {
    const candidato = await this.prisma.candidato.findUnique({
      where: { id },
      select: {
        id: true,
        nombre: true,
        correo: true,
        telefono: true,
        cvUrl: true,
        linkedinUrl: true,
        skillsJson: true,
        experienciaAnios: true,
        fechaRegistro: true,
        estado: true,
      },
    });

    if (!candidato) {
      throw new NotFoundException('Candidato no encontrado');
    }

    return candidato;
  }

  async findByEmail(correo: string) {
    return this.prisma.candidato.findUnique({
      where: { correo },
    });
  }

  async update(id: number, updateCandidatoDto: UpdateCandidatoDto) {
    await this.findOne(id);

    const data: any = { ...updateCandidatoDto };

    if (updateCandidatoDto.contrasena) {
      data.contrasenaHash = await bcrypt.hash(
        updateCandidatoDto.contrasena,
        10,
      );
      delete data.contrasena;
    }

    const candidato = await this.prisma.candidato.update({
      where: { id },
      data,
      select: {
        id: true,
        nombre: true,
        correo: true,
        telefono: true,
        cvUrl: true,
        linkedinUrl: true,
        skillsJson: true,
        experienciaAnios: true,
        fechaRegistro: true,
        estado: true,
      },
    });

    return candidato;
  }

  async updateCvUrl(id: number, cvUrl: string) {
    return this.prisma.candidato.update({
      where: { id },
      data: { cvUrl },
    });
  }

  async remove(id: number) {
    await this.findOne(id);

    return this.prisma.candidato.update({
      where: { id },
      data: { estado: 'INACTIVO' },
    });
  }
}
