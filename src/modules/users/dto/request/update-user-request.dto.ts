import { IsEmail, IsOptional } from 'class-validator';

export class UpdateUserRequestDto {
  @IsOptional()
  name: string;

  @IsOptional()
  @IsEmail()
  email: string;
}
