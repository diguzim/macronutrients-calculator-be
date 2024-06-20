import { Model, ObjectId } from 'mongoose';
import { RawIngredientRepository } from '../../../../core/domain/raw-ingredient/raw-ingredient.repository';
import { RawIngredient } from '../../../../core/domain/raw-ingredient/raw-ingredient.entity';

export class MongooseRawIngredientRepository
  implements RawIngredientRepository
{
  constructor(private readonly rawIngredientModel: Model<RawIngredient>) {}

  async create(rawIngredient: RawIngredient): Promise<RawIngredient> {
    const result = await this.rawIngredientModel.create({
      name: rawIngredient.name,
      proteinRatio: rawIngredient.proteinRatio,
      fatRatio: rawIngredient.fatRatio,
      carbohydrateRatio: rawIngredient.carbohydrateRatio,
      fiberRatio: rawIngredient.fiberRatio,
      kcalPerGram: rawIngredient.kcalPerGram,
    });
    const id = (result['_id'] as any).toString();

    rawIngredient.id = id;

    return rawIngredient;
  }

  async findAll(): Promise<RawIngredient[]> {
    const queryResult: RawIngredient[] = await this.rawIngredientModel
      .find()
      .exec();

    return queryResult.map(
      (rawIngredient) =>
        new RawIngredient({
          id: rawIngredient.id,
          name: rawIngredient.name,
          proteinRatio: rawIngredient.proteinRatio,
          fatRatio: rawIngredient.fatRatio,
          carbohydrateRatio: rawIngredient.carbohydrateRatio,
          fiberRatio: rawIngredient.fiberRatio,
          kcalPerGram: rawIngredient.kcalPerGram,
        }),
    );
  }

  async findOne(id: string): Promise<RawIngredient | null> {
    const queryResult: RawIngredient | null = await this.rawIngredientModel
      .findById(id)
      .exec();

    if (!queryResult) {
      return null;
    }

    return new RawIngredient({
      name: queryResult.name,
      proteinRatio: queryResult.proteinRatio,
      fatRatio: queryResult.fatRatio,
      carbohydrateRatio: queryResult.carbohydrateRatio,
      fiberRatio: queryResult.fiberRatio,
      kcalPerGram: queryResult.kcalPerGram,
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
