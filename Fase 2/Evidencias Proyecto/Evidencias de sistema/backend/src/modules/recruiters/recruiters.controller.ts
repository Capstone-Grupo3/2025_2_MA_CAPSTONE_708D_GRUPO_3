import { Controller, Get, Post, Body } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { RecruitersService } from './recruiters.service';
import { CreateRecruiterDto } from './dto/create-recruiter.dto';

@ApiTags('recruiters')
@ApiBearerAuth()
@Controller('recruiters')
export class RecruitersController {
  constructor(private readonly recruitersService: RecruitersService) {}

  @Post()
  @ApiOperation({ summary: 'Crear nuevo reclutador' })
  create(@Body() createRecruiterDto: CreateRecruiterDto) {
    return this.recruitersService.create(createRecruiterDto);
  }

  @Get()
  @ApiOperation({ summary: 'Obtener todos los reclutadores' })
  findAll() {
    return this.recruitersService.findAll();
  }
}