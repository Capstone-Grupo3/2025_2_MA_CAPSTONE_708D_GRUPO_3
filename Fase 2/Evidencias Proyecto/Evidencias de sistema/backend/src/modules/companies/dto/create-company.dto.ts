import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsEmail, IsOptional, Length } from 'class-validator';

export class CreateCompanyDto {
  @ApiProperty({ description: 'Nombre de la empresa' })
  @IsString()
  @Length(2, 100)
  nombre: string;

  @ApiProperty({ description: 'RUT de la empresa', example: '12.345.678-9' })
  @IsString()
  @Length(8, 12)
  rut: string;

  @ApiProperty({ description: 'Correo electrónico de la empresa' })
  @IsEmail()
  correo: string;

  @ApiProperty({ description: 'Teléfono de contacto' })
  @IsString()
  @Length(8, 15)
  telefono: string;

  @ApiProperty({ description: 'Dirección de la empresa', required: false })
  @IsOptional()
  @IsString()
  direccion?: string;
}