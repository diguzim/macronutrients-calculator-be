import { Injectable } from '@nestjs/common';
import { RawIngredient } from '../../domain/raw-ingredient/raw-ingredient.entity';
import { RawIngredientRepository } from '../../domain/raw-ingredient/raw-ingredient.repository';

type CreateRawIngredientFromAbsoluteValuesInput = {
  name: string;
  weight: number;
  protein: number;
  fat: number;
  carbohydrate: number;
  fiber: number;
  kcal: number;
};

@Injectable()
export class CreateRawIngredientFromAbsoluteValuesUseCase {
  constructor(
    private readonly rawIngredientRepository: RawIngredientRepository,
  ) {}

  async execute(
    input: CreateRawIngredientFromAbsoluteValuesInput,
  ): Promise<RawIngredient> {
    console.log('input:', input);
    const rawIngredient = RawIngredient.createFromAbsoluteValues(input);

    const rawIngredientCreated =
      await this.rawIngredientRepository.create(rawIngredient);

    rawIngredient.id = rawIngredientCreated.id;

    return rawIngredient;
  }
}
