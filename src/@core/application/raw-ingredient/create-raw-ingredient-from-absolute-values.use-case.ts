import { RawIngredient } from '../../domain/raw-ingredient/raw-ingredient.entity';
import { IRawIngredientRepository } from '../../domain/raw-ingredient/raw-ingredient.repository';

type CreateRawIngredientFromAbsoluteValuesInput = {
  name: string;
  weight: number;
  protein: number;
  fat: number;
  carbohydrate: number;
  fiber: number;
  kcal: number;
};

export class CreateRawIngredientFromAbsoluteValuesUseCase {
  constructor(
    private readonly rawIngredientRepository: IRawIngredientRepository,
  ) {}

  async execute(
    input: CreateRawIngredientFromAbsoluteValuesInput,
  ): Promise<RawIngredient> {
    const rawIngredient = RawIngredient.createFromAbsoluteValues(input);

    const rawIngredientCreated =
      await this.rawIngredientRepository.insert(rawIngredient);

    rawIngredient.id = rawIngredientCreated.id;

    return rawIngredient;
  }
}
