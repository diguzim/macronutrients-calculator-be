import { CookedIngredient } from '../../domain/cooked-ingredient/cooked-ingredient.entity';
import { CookedIngredientRepository } from '../../domain/cooked-ingredient/cooked-ingredient.repository';
import { RawIngredientRepository } from '../../domain/raw-ingredient/raw-ingredient.repository';

type CreateCookedIngredientFromRawIngredientInput = {
  raw_ingredient_id: string;
  name: string;
  initialWeightInGrams: number;
  finalWeightInGrams: number;
};

export class CreateCookedIngredientFromRawIngredientUseCase {
  constructor(
    private readonly rawIngredientRepository: RawIngredientRepository,
    private readonly cookedIngredientRepository: CookedIngredientRepository,
  ) {}

  async execute(
    input: CreateCookedIngredientFromRawIngredientInput,
  ): Promise<CookedIngredient> {
    const rawIngredient = await this.rawIngredientRepository.findOne(
      input.raw_ingredient_id,
    );

    if (!rawIngredient) {
      throw new Error('Raw ingredient not found');
    }

    const cookedIngredient = CookedIngredient.createFromRawIngredient(
      rawIngredient,
      input.initialWeightInGrams,
      input.finalWeightInGrams,
    );
    cookedIngredient.name = input.name;

    const cookedIngredientCreated =
      await this.cookedIngredientRepository.insert(cookedIngredient);

    cookedIngredient.id = cookedIngredientCreated.id;

    return cookedIngredient;
  }
}
