import { IsOptional } from 'class-validator';
import { BaseFilter } from '../../../common/base-filter';
export class GetAllRequestDto extends BaseFilter {
  @IsOptional()
  onlyAvailable = false;
}
