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
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiBearerAuth,
  ApiResponse,
} from '@nestjs/swagger';
import { CandidatosService } from './candidatos.service';
import { CreateCandidatoDto } from './dto/create-candidato.dto';
import { UpdateCandidatoDto } from './dto/update-candidato.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@ApiTags('candidatos')
@Controller('candidatos')
export class CandidatosController {
  constructor(private readonly candidatosService: CandidatosService) {}

  @Post()
  @ApiOperation({ summary: 'Registrar un nuevo candidato' })
  @ApiResponse({ status: 201, description: 'Candidato creado exitosamente' })
  @ApiResponse({ status: 409, description: 'El correo ya está registrado' })
  create(@Body() createCandidatoDto: CreateCandidatoDto) {
    return this.candidatosService.create(createCandidatoDto);
  }

  @Get('me')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Obtener perfil del candidato autenticado' })
  @ApiResponse({ status: 200, description: 'Perfil del candidato' })
  @ApiResponse({ status: 401, description: 'No autenticado' })
  getMe(@Request() req) {
    return this.candidatosService.findOne(req.user.userId);
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Obtener todos los candidatos' })
  findAll() {
    return this.candidatosService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener un candidato por ID' })
  @ApiResponse({ status: 200, description: 'Candidato encontrado' })
  @ApiResponse({ status: 404, description: 'Candidato no encontrado' })
  findOne(@Param('id') id: string) {
    return this.candidatosService.findOne(+id);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Actualizar datos de un candidato' })
  @ApiResponse({ status: 200, description: 'Candidato actualizado' })
  update(
    @Param('id') id: string,
    @Body() updateCandidatoDto: UpdateCandidatoDto,
  ) {
    return this.candidatosService.update(+id, updateCandidatoDto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Desactivar un candidato' })
  remove(@Param('id') id: string) {
    return this.candidatosService.remove(+id);
  }
}
