import { IsEnum, IsNumber, IsOptional, IsString, Min } from 'class-validator';
import { ItemType } from '../../../../../core/domain/item/item.entity';

export class GetItemsDto {
  @IsOptional()
  @IsString()
  name: string;

  @IsOptional()
  @IsEnum(ItemType)
  type: ItemType;

  @IsOptional()
  @Min(0)
  proteinRatio: number;

  @IsOptional()
  @Min(0)
  fatRatio: number;

  @IsOptional()
  @Min(0)
  carbohydrateRatio: number;

  @IsOptional()
  @Min(0)
  fiberRatio: number;

  @IsOptional()
  @IsNumber()
  kcalPerGram: number;
}
