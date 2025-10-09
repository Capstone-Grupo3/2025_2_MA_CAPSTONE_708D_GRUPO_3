import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Request,
  Query,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiBearerAuth,
  ApiResponse,
  ApiQuery,
} from '@nestjs/swagger';
import { VacantesService } from './vacantes.service';
import { CreateVacanteDto } from './dto/create-vacante.dto';
import { UpdateVacanteDto } from './dto/update-vacante.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@ApiTags('vacantes')
@Controller('vacantes')
export class VacantesController {
  constructor(private readonly vacantesService: VacantesService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Crear una nueva vacante' })
  @ApiResponse({ status: 201, description: 'Vacante creada exitosamente' })
  create(@Body() createVacanteDto: CreateVacanteDto, @Request() req) {
    return this.vacantesService.create(createVacanteDto, req.user.userId);
  }

  @Get()
  @ApiOperation({ summary: 'Obtener todas las vacantes activas' })
  @ApiQuery({ name: 'estado', required: false })
  findAll(@Query('estado') estado?: string) {
    return this.vacantesService.findAll(estado);
  }

  @Get('empresa/:empresaId')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Obtener vacantes de una empresa' })
  findByEmpresa(@Param('empresaId') empresaId: string) {
    return this.vacantesService.findByEmpresa(+empresaId);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener una vacante por ID' })
  @ApiResponse({ status: 200, description: 'Vacante encontrada' })
  @ApiResponse({ status: 404, description: 'Vacante no encontrada' })
  findOne(@Param('id') id: string) {
    return this.vacantesService.findOne(+id);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Actualizar una vacante' })
  update(
    @Param('id') id: string,
    @Body() updateVacanteDto: UpdateVacanteDto,
    @Request() req,
  ) {
    return this.vacantesService.update(+id, updateVacanteDto, req.user.userId);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Cerrar una vacante' })
  remove(@Param('id') id: string, @Request() req) {
    return this.vacantesService.remove(+id, req.user.userId);
  }
}
