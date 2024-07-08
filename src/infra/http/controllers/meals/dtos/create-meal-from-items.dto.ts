import { Type } from 'class-transformer';
import { IsArray, IsNumber, IsString, ValidateNested } from 'class-validator';

class ItemIdWithWeightDto {
  @IsString()
  itemId: string;

  @IsNumber()
  weight: number;
}

export class CreateMealFromItemsDto {
  @IsString()
  name: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ItemIdWithWeightDto)
  itemIdsWithWeights: ItemIdWithWeightDto[];
}
