import { RawIngredient } from '../../domain/raw-ingredient/raw-ingredient.entity';
import { IRawIngredientRepository } from '../../domain/raw-ingredient/raw-ingredient.repository';

type CreateRawIngredientFromRatiosInput = {
  name: string;
  protein_ratio: number;
  fat_ratio: number;
  carbohydrate_ratio: number;
  fiber_ratio: number;
  kcal_per_gram: number;
};

export class CreateRawIngredientFromRatiosUseCase {
  constructor(
    private readonly rawIngredientRepository: IRawIngredientRepository,
  ) {}

  async execute(
    input: CreateRawIngredientFromRatiosInput,
  ): Promise<RawIngredient> {
    const rawIngredient = RawIngredient.createFromRatios(input);

    const rawIngredientCreated =
      await this.rawIngredientRepository.insert(rawIngredient);

    rawIngredient.id = rawIngredientCreated.id;

    return rawIngredient;
  }
}
