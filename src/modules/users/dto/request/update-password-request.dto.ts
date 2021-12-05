import { IsNotEmpty } from 'class-validator';

export class UpdatePassWordRequestDto {
  @IsNotEmpty()
  currentPassword: string;

  @IsNotEmpty()
  newPassword: string;
}
