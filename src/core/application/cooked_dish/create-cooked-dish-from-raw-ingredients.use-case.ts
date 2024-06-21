import { Injectable } from '@nestjs/common';
import { CookedDish } from '../../domain/cooked-dish/cooked-dish.entity';
import { CookedDishRepository } from '../../domain/cooked-dish/cooked-dish.repository';
import { RawIngredientRepository } from '../../domain/raw-ingredient/raw-ingredient.repository';

type CreateCookedDishFromRawIngredientsInput = {
  name: string;
  rawIngredientIdWithAmount: {
    rawIngredientId: string;
    amountInGrams: number;
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
    const { name, rawIngredientIdWithAmount, finalWeightInGrams } = input;

    const rawIngredientsWithAmounts = await Promise.all(
      rawIngredientIdWithAmount.map(async (rawIngredient) => {
        const rawIngredientFound = await this.rawIngredientRepository.findBy({
          id: rawIngredient.rawIngredientId,
        });

        if (!rawIngredientFound) {
          throw new Error('Raw ingredient not found');
        }

        return {
          rawIngredient: rawIngredientFound,
          amountInGrams: rawIngredient.amountInGrams,
        };
      }),
    );

    console.log('rawIngredientsWithAmounts:', rawIngredientsWithAmounts);

    const cookedDish = CookedDish.createFromRawIngredientsAmounts(
      name,
      rawIngredientsWithAmounts,
      finalWeightInGrams,
    );

    const cookedDishCreated =
      await this.cookedDishRepository.create(cookedDish);

    cookedDish.id = cookedDishCreated.id;

    return cookedDish;
  }
}
