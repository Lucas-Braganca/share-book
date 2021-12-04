import { IsOptional } from 'class-validator';
export class GetAllRequestDto {
  @IsOptional()
  skip?: number = 0;

  @IsOptional()
  take?: number = 10;

  @IsOptional()
  search?: string;

  @IsOptional()
  onlyAvailable = false;
}
