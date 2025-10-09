import {
  Injectable,
  NotFoundException,
  ForbiddenException,
} from '@nestjs/common';
import { PrismaService } from '../../common/prisma/prisma.service';
import { CreateVacanteDto } from './dto/create-vacante.dto';
import { UpdateVacanteDto } from './dto/update-vacante.dto';

@Injectable()
export class VacantesService {
  constructor(private prisma: PrismaService) {}

  async create(createVacanteDto: CreateVacanteDto, empresaId: number) {
    return this.prisma.vacante.create({
      data: {
        ...createVacanteDto,
        idEmpresa: empresaId,
      },
      include: {
        empresa: {
          select: {
            id: true,
            nombre: true,
            logoUrl: true,
          },
        },
      },
    });
  }

  async findAll(estado?: string) {
    const where = estado ? { estado: estado as any } : {};

    return this.prisma.vacante.findMany({
      where,
      include: {
        empresa: {
          select: {
            id: true,
            nombre: true,
            logoUrl: true,
          },
        },
      },
      orderBy: {
        fechaPublicacion: 'desc',
      },
    });
  }

  async findByEmpresa(empresaId: number) {
    return this.prisma.vacante.findMany({
      where: { idEmpresa: empresaId },
      include: {
        _count: {
          select: {
            postulaciones: true,
          },
        },
      },
      orderBy: {
        fechaPublicacion: 'desc',
      },
    });
  }

  async findOne(id: number) {
    const vacante = await this.prisma.vacante.findUnique({
      where: { id },
      include: {
        empresa: {
          select: {
            id: true,
            nombre: true,
            descripcion: true,
            logoUrl: true,
          },
        },
        _count: {
          select: {
            postulaciones: true,
          },
        },
      },
    });

    if (!vacante) {
      throw new NotFoundException('Vacante no encontrada');
    }

    return vacante;
  }

  async update(
    id: number,
    updateVacanteDto: UpdateVacanteDto,
    empresaId: number,
  ) {
    const vacante = await this.findOne(id);

    if (vacante.idEmpresa !== empresaId) {
      throw new ForbiddenException(
        'No tienes permisos para actualizar esta vacante',
      );
    }

    return this.prisma.vacante.update({
      where: { id },
      data: updateVacanteDto,
      include: {
        empresa: {
          select: {
            id: true,
            nombre: true,
            logoUrl: true,
          },
        },
      },
    });
  }

  async remove(id: number, empresaId: number) {
    const vacante = await this.findOne(id);

    if (vacante.idEmpresa !== empresaId) {
      throw new ForbiddenException(
        'No tienes permisos para eliminar esta vacante',
      );
    }

    return this.prisma.vacante.update({
      where: { id },
      data: { estado: 'CERRADA' },
    });
  }
}
