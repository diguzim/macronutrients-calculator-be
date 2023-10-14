import { IsString, Min } from 'class-validator';

export class CreateRawIngredientDto {
  @IsString()
  name: string;

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
