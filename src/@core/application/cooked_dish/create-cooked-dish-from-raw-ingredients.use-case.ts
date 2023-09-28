import {
  CookedDish,
  RawIngredientAmount,
} from '../../domain/cooked-dish/cooked-dish.entity';
import { ICookedDishRepository } from '../../domain/cooked-dish/cooked-dish.repository';
import { IRawIngredientRepository } from '../../domain/raw-ingredient/raw-ingredient.repository';

type CreateCookedDishFromRawIngredientsInput = {
  name: string;
  raw_ingredients_id_with_amount: {
    raw_ingredient_id: string;
    amount_in_grams: number;
  }[];
  finalWeightInGrams;
};

export class CreateCookedDishFromRawIngredientsUseCase {
  constructor(
    private readonly rawIngredientRepository: IRawIngredientRepository,
    private readonly cookedDishRepository: ICookedDishRepository,
  ) {}

  async execute(
    input: CreateCookedDishFromRawIngredientsInput,
  ): Promise<CookedDish> {
    const rawIngredients = await Promise.all(
      input.raw_ingredients_id_with_amount.map(async (rawIngredient) => {
        const rawIngredientFound = await this.rawIngredientRepository.findOne(
          rawIngredient.raw_ingredient_id,
        );

        if (!rawIngredientFound) {
          throw new Error('Raw ingredient not found');
        }

        return {
          raw_ingredient: rawIngredientFound,
          amount_in_grams: rawIngredient.amount_in_grams,
        } as RawIngredientAmount;
      }),
    );

    const cookedDish = CookedDish.createFromRawIngredients(
      input.name,
      rawIngredients,
      input.finalWeightInGrams,
    );

    const cookedDishCreated =
      await this.cookedDishRepository.insert(cookedDish);

    cookedDish.id = cookedDishCreated.id;

    return cookedDish;
  }
}
