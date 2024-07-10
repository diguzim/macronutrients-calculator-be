import { IsNumber, IsOptional, IsString, Min } from 'class-validator';

export class GetMealsDto {
  @IsOptional()
  @IsString()
  name: string;

  @IsOptional()
  @Min(0)
  protein: number;

  @IsOptional()
  @Min(0)
  fat: number;

  @IsOptional()
  @Min(0)
  carbohydrate: number;

  @IsOptional()
  @Min(0)
  fiber: number;

  @IsOptional()
  @IsNumber()
  kcal: number;
}
