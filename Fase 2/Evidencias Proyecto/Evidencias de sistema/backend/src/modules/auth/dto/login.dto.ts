import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, MinLength } from 'class-validator';

export class LoginDto {
  @ApiProperty({ description: 'Correo electrónico del reclutador' })
  @IsEmail()
  correo: string;

  @ApiProperty({ description: 'Contraseña del reclutador' })
  @IsString()
  @MinLength(6)
  password: string;
}