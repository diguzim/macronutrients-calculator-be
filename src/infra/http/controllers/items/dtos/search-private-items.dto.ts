import { IsString } from 'class-validator';

export class SearchPrivateItemsDto {
  @IsString()
  name: string;
}
