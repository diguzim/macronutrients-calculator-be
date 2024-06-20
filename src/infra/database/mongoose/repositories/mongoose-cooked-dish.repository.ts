import { Model, ObjectId } from 'mongoose';
import { CookedDishRepository } from '../../../../core/domain/cooked-dish/cooked-dish.repository';
import { CookedDish } from '../../../../core/domain/cooked-dish/cooked-dish.entity';

export class MongooseCookedDishRepository implements CookedDishRepository {
  constructor(private readonly cookedDishModel: Model<CookedDish>) {}

  async insert(cookedDish: CookedDish): Promise<CookedDish> {
    const result = await this.cookedDishModel.create({
      name: cookedDish.name,
      proteinRatio: cookedDish.proteinRatio,
      fatRatio: cookedDish.fatRatio,
      carbohydrateRatio: cookedDish.carbohydrateRatio,
      fiberRatio: cookedDish.fiberRatio,
      kcalPerGram: cookedDish.kcalPerGram,
    });
    const id = (result['_id'] as ObjectId).toString();

    cookedDish.id = id;

    return cookedDish;
  }

  async findAll(): Promise<CookedDish[]> {
    const queryResult: CookedDish[] = await this.cookedDishModel.find().exec();

    return queryResult.map(
      (cookedDish) =>
        new CookedDish({
          id: cookedDish.id,
          name: cookedDish.name,
          proteinRatio: cookedDish.proteinRatio,
          fatRatio: cookedDish.fatRatio,
          carbohydrateRatio: cookedDish.carbohydrateRatio,
          fiberRatio: cookedDish.fiberRatio,
          kcalPerGram: cookedDish.kcalPerGram,
        }),
    );
  }

  async findOne(id: string): Promise<CookedDish | null> {
    const queryResult: CookedDish | null = await this.cookedDishModel
      .findById(id)
      .exec();

    if (!queryResult) {
      return null;
    }

    return new CookedDish({
      id: queryResult.id,
      name: queryResult.name,
      proteinRatio: queryResult.proteinRatio,
      fatRatio: queryResult.fatRatio,
      carbohydrateRatio: queryResult.carbohydrateRatio,
      fiberRatio: queryResult.fiberRatio,
      kcalPerGram: queryResult.kcalPerGram,
    });
  }

  async update(cookedDish: CookedDish): Promise<void> {
    // TODO: implement
    return;
  }

  async delete(id: string): Promise<void> {
    // TODO: implement
    return;
  }
}
