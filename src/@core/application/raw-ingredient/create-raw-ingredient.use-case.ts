import { RawIngredient } from '../../domain/raw-ingredient/raw-ingredient.entity';
import { IRawIngredientRepository } from '../../domain/raw-ingredient/raw-ingredient.repository';

type CreateRawIngredientInput = {
  name: string;
  protein_ratio: number;
  fat_ratio: number;
  carbohydrate_ratio: number;
  fiber_ratio: number;
  kcal_per_gram: number;
};

export class CreateRawIngredientUseCase {
  constructor(
    private readonly rawIngredientRepository: IRawIngredientRepository,
  ) {}

  async execute(input: CreateRawIngredientInput): Promise<RawIngredient> {
    const rawIngredient = RawIngredient.create(input);

    const rawIngredientCreated =
      await this.rawIngredientRepository.insert(rawIngredient);

    rawIngredient.id = rawIngredientCreated.id;

    return rawIngredient;
  }
}
