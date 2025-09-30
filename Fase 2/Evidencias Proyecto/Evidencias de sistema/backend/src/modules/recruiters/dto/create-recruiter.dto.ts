import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsEmail, MinLength, IsEnum, IsOptional } from 'class-validator';

export class CreateRecruiterDto {
  @ApiProperty({ description: 'Nombre completo del reclutador' })
  @IsString()
  nombreCompleto: string;

  @ApiProperty({ description: 'Correo electrónico del reclutador' })
  @IsEmail()
  correo: string;

  @ApiProperty({ description: 'Contraseña del reclutador' })
  @IsString()
  @MinLength(6)
  password: string;

  @ApiProperty({ description: 'Rol del reclutador', enum: ['admin', 'reclutador'], default: 'reclutador' })
  @IsOptional()
  @IsEnum(['admin', 'reclutador'])
  rol?: string = 'reclutador';
}