import { OmitType } from '@nestjs/swagger';
import { User } from '../../../users/users.entity';

export class SignupRequestDto extends OmitType(User, [
  'id',
  'updatedAt',
  'createdAt',
]) {}
