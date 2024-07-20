import { IsString } from 'class-validator';

export class SearchPublicItemsDto {
  @IsString()
  name: string;
}
