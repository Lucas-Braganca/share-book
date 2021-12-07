import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class UpdatePassWordRequestDto {
  @IsNotEmpty()
  @ApiProperty({
    description: 'Senha atual do usuário que será utilizada para comparação',
    required: true,
    example: 'batata',
  })
  currentPassword: string;

  @IsNotEmpty()
  @ApiProperty({
    description: 'Nova senha do usuário que será salva',
    required: true,
    example: 'batata_doce',
  })
  newPassword: string;
}
