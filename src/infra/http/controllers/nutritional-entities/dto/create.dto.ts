import { IsPositive, IsString, IsEnum } from 'class-validator';
import { NutritionalEntityType } from '../../../../../utils/enums/nutritional-entity-type.enum';

export class CalculateNutritionalValuesSingleDto {
  @IsString()
  @IsEnum(NutritionalEntityType)
  type: NutritionalEntityType;

  @IsString()
  id: string;

  @IsPositive()
  weight: number;
}
