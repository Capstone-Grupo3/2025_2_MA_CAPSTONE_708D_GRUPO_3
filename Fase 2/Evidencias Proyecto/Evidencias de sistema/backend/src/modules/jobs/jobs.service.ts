import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../common/database/prisma.service';

@Injectable()
export class JobsService {
  constructor(private prisma: PrismaService) {}

  async findAll() {
    return this.prisma.job.findMany({
      include: {
        empresa: true,
        creador: {
          select: {
            id: true,
            nombreCompleto: true,
            correo: true,
          },
        },
      },
    });
  }

  async findOne(id: number) {
    const job = await this.prisma.job.findUnique({
      where: { id },
      include: {
        empresa: true,
        creador: true,
        applications: {
          include: {
            candidate: true,
          },
        },
      },
    });

    if (!job) {
      throw new NotFoundException(`Oferta con ID ${id} no encontrada`);
    }

    return job;
  }
}