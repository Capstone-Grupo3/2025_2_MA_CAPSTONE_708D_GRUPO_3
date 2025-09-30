import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../common/database/prisma.service';
import { CreateRecruiterDto } from './dto/create-recruiter.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class RecruitersService {
  constructor(private prisma: PrismaService) {}

  async create(createRecruiterDto: CreateRecruiterDto) {
    const hashedPassword = await bcrypt.hash(createRecruiterDto.password, 10);
    
    return this.prisma.recruiter.create({
      data: {
        ...createRecruiterDto,
        password: hashedPassword,
      },
      select: {
        id: true,
        nombreCompleto: true,
        correo: true,
        rol: true,
        activo: true,
        createdAt: true,
        updatedAt: true,
      },
    });
  }

  async findAll() {
    return this.prisma.recruiter.findMany({
      select: {
        id: true,
        nombreCompleto: true,
        correo: true,
        rol: true,
        activo: true,
        createdAt: true,
        updatedAt: true,
      },
    });
  }
}