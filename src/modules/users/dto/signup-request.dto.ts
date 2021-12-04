import { OmitType } from '@nestjs/swagger';
import { User } from '../users.entity';

export class SignupRequestDto extends OmitType(User, [
  'id',
  'updatedAt',
  'createdAt',
]) {}
