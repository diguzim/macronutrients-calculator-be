import { RawIngredient } from '../../domain/raw-ingredient/raw-ingredient.entity';
import { RawIngredientRepository } from '../../domain/raw-ingredient/raw-ingredient.repository';

type CreateRawIngredientFromRatiosInput = {
  name: string;
  proteinRatio: number;
  fatRatio: number;
  carbohydrateRatio: number;
  fiberRatio: number;
  kcalPerGram: number;
};

export class CreateRawIngredientFromRatiosUseCase {
  constructor(
    private readonly rawIngredientRepository: RawIngredientRepository,
  ) {}

  async execute(
    input: CreateRawIngredientFromRatiosInput,
  ): Promise<RawIngredient> {
    const rawIngredient = new RawIngredient(input);

    const rawIngredientCreated =
      await this.rawIngredientRepository.create(rawIngredient);

    rawIngredient.id = rawIngredientCreated.id;

    return rawIngredient;
  }
}
