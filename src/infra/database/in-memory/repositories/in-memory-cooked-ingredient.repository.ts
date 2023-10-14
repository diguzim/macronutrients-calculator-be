import { Injectable } from '@nestjs/common';
import { CookedIngredientRepository } from '../../../../@core/domain/cooked-ingredient/cooked-ingredient.repository';

@Injectable()
export class InMemoryCookedIngredientRepository
  implements CookedIngredientRepository
{
  private readonly cookedIngredients = [];

  async insert(cookedIngredient) {
    cookedIngredient.id = (this.cookedIngredients.length + 1).toString();
    this.cookedIngredients.push(cookedIngredient);
    return cookedIngredient;
  }

  async findAll() {
    return this.cookedIngredients;
  }

  async findOne(id) {
    return this.cookedIngredients.find(
      (cookedIngredient) => cookedIngredient.id === id,
    );
  }

  async update(cookedIngredient) {
    this.cookedIngredients.forEach((ci, index) => {
      if (ci.id === cookedIngredient.id) {
        this.cookedIngredients[index] = cookedIngredient;
      }
    });
  }

  async delete(id) {
    this.cookedIngredients.forEach((ci, index) => {
      if (ci.id === id) {
        this.cookedIngredients.splice(index, 1);
      }
    });
  }
}
