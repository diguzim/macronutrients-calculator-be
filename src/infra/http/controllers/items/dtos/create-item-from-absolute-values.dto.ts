import { IsEnum, IsString, Min } from 'class-validator';
import { ItemType } from '../../../../../core/domain/item/item.entity';

export class CreateItemFromAbsoluteValuesDto {
  @IsString()
  name: string;

  @IsEnum(ItemType)
  type: ItemType;

  @Min(0)
  weight: number;

  @Min(0)
  protein: number;

  @Min(0)
  fat: number;

  @Min(0)
  carbohydrate: number;

  @Min(0)
  fiber: number;

  @Min(0)
  kcal: number;
}
