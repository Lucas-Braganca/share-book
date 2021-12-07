import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsOptional } from 'class-validator';

export class UpdateUserRequestDto {
  @IsOptional()
  @ApiProperty({
    description: 'Nome do usuário',
    required: false,
    example: 'João Pereira',
  })
  name: string;

  @IsOptional()
  @IsEmail()
  @ApiProperty({
    description: 'E-mail do usuário',
    required: false,
    example: 'email@email.com',
  })
  email: string;
}
