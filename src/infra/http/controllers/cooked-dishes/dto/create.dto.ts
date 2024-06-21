import { IsString, Min, ArrayMinSize } from 'class-validator';

export class CreateCookedDishFromRawIngredientsDto {
  @IsString()
  name: string;

  @ArrayMinSize(1)
  rawIngredientIdWithAmount: {
    rawIngredientId: string;
    amountInGrams: number;
  }[];

  @Min(0)
  finalWeightInGrams: number;
}
