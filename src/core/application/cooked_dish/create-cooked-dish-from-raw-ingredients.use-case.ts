import { Injectable } from '@nestjs/common';
import { CookedDish } from '../../domain/cooked-dish/cooked-dish.entity';
import { CookedDishRepository } from '../../domain/cooked-dish/cooked-dish.repository';
import { RawIngredientRepository } from '../../domain/raw-ingredient/raw-ingredient.repository';

type CreateCookedDishFromRawIngredientsInput = {
  name: string;
  raw_ingredients_id_with_amount: {
    raw_ingredient_id: string;
    amount_in_grams: number;
  }[];
  finalWeightInGrams;
};

@Injectable()
export class CreateCookedDishFromRawIngredientsUseCase {
  constructor(
    private readonly rawIngredientRepository: RawIngredientRepository,
    private readonly cookedDishRepository: CookedDishRepository,
  ) {}

  async execute(
    input: CreateCookedDishFromRawIngredientsInput,
  ): Promise<CookedDish> {
    const rawIngredients = await Promise.all(
      input.raw_ingredients_id_with_amount.map(async (rawIngredient) => {
        const rawIngredientFound = await this.rawIngredientRepository.findBy({
          id: rawIngredient.raw_ingredient_id,
        });

        if (!rawIngredientFound) {
          throw new Error('Raw ingredient not found');
        }

        return {
          raw_ingredient: rawIngredientFound,
          amount_in_grams: rawIngredient.amount_in_grams,
        } as any;
      }),
    );

    const cookedDish = CookedDish.createFromRawIngredientsAmounts(
      input.name,
      rawIngredients,
      input.finalWeightInGrams,
    );

    const cookedDishCreated =
      await this.cookedDishRepository.create(cookedDish);

    cookedDish.id = cookedDishCreated.id;

    return cookedDish;
  }
}