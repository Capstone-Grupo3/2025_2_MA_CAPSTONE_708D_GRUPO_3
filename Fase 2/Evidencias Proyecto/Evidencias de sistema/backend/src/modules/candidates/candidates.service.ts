import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../common/database/prisma.service';

@Injectable()
export class CandidatesService {
  constructor(private prisma: PrismaService) {}

  async findAll() {
    return this.prisma.candidate.findMany({
      where: {
        deletedAt: null,
      },
      include: {
        applications: {
          include: {
            job: {
              select: {
                id: true,
                titulo: true,
                empresa: {
                  select: {
                    nombre: true,
                  },
                },
              },
            },
          },
        },
      },
    });
  }

  async findOne(id: number) {
    const candidate = await this.prisma.candidate.findUnique({
      where: { id },
      include: {
        applications: {
          include: {
            job: {
              include: {
                empresa: true,
              },
            },
          },
        },
      },
    });

    if (!candidate || candidate.deletedAt) {
      throw new NotFoundException(`Candidato con ID ${id} no encontrado`);
    }

    return candidate;
  }
}