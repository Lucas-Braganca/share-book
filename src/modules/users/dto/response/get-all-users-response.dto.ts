import { ApiProperty } from '@nestjs/swagger';
import { User } from '../../users.entity';

export class GetAllUsersResponseDto {
  @ApiProperty({ description: 'Lista de usuários retornados' })
  users: User[];

  @ApiProperty({ description: 'Total de usuários presentes no banco de dados' })
  count: number;
}
