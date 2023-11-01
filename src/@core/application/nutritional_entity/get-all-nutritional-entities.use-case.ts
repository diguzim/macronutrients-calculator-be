import { Injectable } from '@nestjs/common';
import { NutritionalEntityType } from '../../../utils/enums/nutritional-entity-type.enum';
import { CookedDishRepository } from '../../domain/cooked-dish/cooked-dish.repository';
import { RawIngredientRepository } from '../../domain/raw-ingredient/raw-ingredient.repository';

@Injectable()
export class GetAllNutritionalEntitiesUseCase {
  constructor(
    private readonly rawIngredientRepository: RawIngredientRepository,
    private readonly cookedDishRepository: CookedDishRepository,
  ) {}
  async execute() {
    const rawIngredients = await this.rawIngredientRepository.findAll();
    const cookedDishes = await this.cookedDishRepository.findAll();

    return [
      {
        type: NutritionalEntityType.RawIngredient,
        values: rawIngredients,
      },
      {
        type: NutritionalEntityType.CookedDish,
        values: cookedDishes,
      },
    ];
  }
}
