import { Model, ObjectId } from 'mongoose';
import { CookedDishRepository } from '../../../../core/domain/cooked-dish/cooked-dish.repository';
import { CookedDish } from '../../../../core/domain/cooked-dish/cooked-dish.entity';

export class MongooseCookedDishRepository implements CookedDishRepository {
  constructor(private readonly cookedDishModel: Model<CookedDish>) {}

  async create(cookedDish: CookedDish): Promise<CookedDish> {
    const result = await this.cookedDishModel.create({
      name: cookedDish.name,
      proteinRatio: cookedDish.proteinRatio,
      fatRatio: cookedDish.fatRatio,
      carbohydrateRatio: cookedDish.carbohydrateRatio,
      fiberRatio: cookedDish.fiberRatio,
      kcalPerGram: cookedDish.kcalPerGram,
    });
    const id = (result['_id'] as any).toString();

    cookedDish.id = id;

    return cookedDish;
  }

  async findAllBy(params: Partial<CookedDish>): Promise<CookedDish[]> {
    const queryResult: CookedDish[] = await this.cookedDishModel
      .find(params)
      .exec();

    return queryResult.map((cookedDish) => {
      return new CookedDish({
        id: cookedDish.id,
        name: cookedDish.name,
        proteinRatio: cookedDish.proteinRatio,
        fatRatio: cookedDish.fatRatio,
        carbohydrateRatio: cookedDish.carbohydrateRatio,
        fiberRatio: cookedDish.fiberRatio,
        kcalPerGram: cookedDish.kcalPerGram,
      });
    });
  }

  async findBy(params: Partial<CookedDish>): Promise<CookedDish | null> {
    const queryResult = await this.cookedDishModel.findOne(params).exec();

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
}
