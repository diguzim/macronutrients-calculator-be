import { Injectable } from '@nestjs/common';
import { RawIngredientRepository } from '../../../../@core/domain/raw-ingredient/raw-ingredient.repository';
import { RawIngredient } from '../../../../@core/domain/raw-ingredient/raw-ingredient.entity';

@Injectable()
export class InMemoryRawIngredientRepository
  implements RawIngredientRepository
{
  private readonly rawIngredients: RawIngredient[] = [];

  async insert(rawIngredient: RawIngredient): Promise<RawIngredient> {
    rawIngredient.id = (this.rawIngredients.length + 1).toString();
    this.rawIngredients.push(rawIngredient);

    return rawIngredient;
  }

  async findAll(): Promise<RawIngredient[]> {
    return this.rawIngredients;
  }

  async findOne(id: string): Promise<RawIngredient | null> {
    return this.rawIngredients.find((rawIngredient) => rawIngredient.id === id);
  }

  async update(rawIngredient: RawIngredient): Promise<void> {
    this.rawIngredients.forEach((ri, index) => {
      if (ri.id === rawIngredient.id) {
        this.rawIngredients[index] = rawIngredient;
      }
    });
  }

  async delete(id: string): Promise<void> {
    this.rawIngredients.forEach((ri, index) => {
      if (ri.id === id) {
        this.rawIngredients.splice(index, 1);
      }
    });
  }
}
