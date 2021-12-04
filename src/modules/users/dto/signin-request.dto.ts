import { IsEmail, IsNotEmpty } from 'class-validator';

export class SigninRequestDto {
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  password: string;
}
