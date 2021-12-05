import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty } from 'class-validator';

export class SigninRequestDto {
  @IsNotEmpty()
  @IsEmail()
  @ApiProperty({
    description: 'E-mail do usuário',
    required: true,
    example: 'teste@teste.com',
  })
  email: string;

  @IsNotEmpty()
  @ApiProperty({
    description: 'Senha do usuário',
    required: true,
    example: 'password',
  })
  password: string;
}
