import { IsEnum, IsNumber, IsString, Min } from 'class-validator';
import { ItemType } from '../../../../../core/domain/item/item.entity';

export class CreateItemFromRatiosDto {
  @IsString()
  name: string;

  @IsEnum(ItemType)
  type: ItemType;

  @Min(0)
  proteinRatio: number;

  @Min(0)
  fatRatio: number;

  @Min(0)
  carbohydrateRatio: number;

  @Min(0)
  fiberRatio: number;

  @IsNumber()
  kcalPerGram: number;
}
