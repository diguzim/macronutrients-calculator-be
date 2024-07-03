import { Type } from 'class-transformer';
import { IsArray, IsPositive, IsString, ValidateNested } from 'class-validator';

class ItemIdWithWeightDto {
  @IsString()
  itemId: string;

  @IsPositive()
  weight: number;
}

export class CalculateNutritionalValuesDto {
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ItemIdWithWeightDto)
  itemIdsWithWeights: ItemIdWithWeightDto[];
}
