import { Model, ObjectId } from 'mongoose';
import { RawIngredientRepository } from '../../../../@core/domain/raw-ingredient/raw-ingredient.repository';
import { RawIngredient } from '../../../../@core/domain/raw-ingredient/raw-ingredient.entity';

export class MongooseRawIngredientRepository
  implements RawIngredientRepository
{
  constructor(private readonly rawIngredientModel: Model<RawIngredient>) {}

  async insert(rawIngredient: RawIngredient): Promise<RawIngredient> {
    const result = await this.rawIngredientModel.create({
      name: rawIngredient.name,
      protein_ratio: rawIngredient.protein_ratio,
      fat_ratio: rawIngredient.fat_ratio,
      carbohydrate_ratio: rawIngredient.carbohydrate_ratio,
      fiber_ratio: rawIngredient.fiber_ratio,
      kcal_per_gram: rawIngredient.kcal_per_gram,
    });
    const id = (result['_id'] as ObjectId).toString();

    rawIngredient.id = id;

    return rawIngredient;
  }

  async findAll(): Promise<RawIngredient[]> {
    // TODO: implement
    return [];
  }

  async findOne(id: string): Promise<RawIngredient | null> {
    const queryResult: RawIngredient | null = await this.rawIngredientModel
      .findById(id)
      .exec();

    if (!queryResult) {
      return null;
    }

    return RawIngredient.createFromRatios({
      name: queryResult.name,
      protein_ratio: queryResult.protein_ratio,
      fat_ratio: queryResult.fat_ratio,
      carbohydrate_ratio: queryResult.carbohydrate_ratio,
      fiber_ratio: queryResult.fiber_ratio,
      kcal_per_gram: queryResult.kcal_per_gram,
    });
  }

  async update(rawIngredient: RawIngredient): Promise<void> {
    // TODO: implement
    return;
  }

  async delete(id: string): Promise<void> {
    // TODO: implement
    return;
  }
}
