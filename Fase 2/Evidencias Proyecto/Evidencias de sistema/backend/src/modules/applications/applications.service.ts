import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../common/database/prisma.service';

@Injectable()
export class ApplicationsService {
  constructor(private prisma: PrismaService) {}

  async findAll() {
    return this.prisma.application.findMany({
      where: {
        deletedAt: null,
      },
      include: {
        job: {
          include: {
            empresa: true,
          },
        },
        candidate: true,
        events: {
          include: {
            recruiter: {
              select: {
                id: true,
                nombreCompleto: true,
              },
            },
          },
          orderBy: {
            fechaCambio: 'desc',
          },
        },
      },
    });
  }

  async findOne(id: number) {
    const application = await this.prisma.application.findUnique({
      where: { id },
      include: {
        job: {
          include: {
            empresa: true,
          },
        },
        candidate: true,
        events: {
          include: {
            recruiter: {
              select: {
                id: true,
                nombreCompleto: true,
              },
            },
          },
          orderBy: {
            fechaCambio: 'desc',
          },
        },
      },
    });

    if (!application || application.deletedAt) {
      throw new NotFoundException(`Postulación con ID ${id} no encontrada`);
    }

    return application;
  }
}