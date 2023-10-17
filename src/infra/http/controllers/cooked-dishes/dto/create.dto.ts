import { IsString, Min, ArrayMinSize } from 'class-validator';

export class CreateCookedDishFromRawIngredientsDto {
  @IsString()
  name: string;

  @ArrayMinSize(1)
  raw_ingredients_id_with_amount: {
    raw_ingredient_id: string;
    amount_in_grams: number;
  }[];

  @Min(0)
  finalWeightInGrams: number;
}
