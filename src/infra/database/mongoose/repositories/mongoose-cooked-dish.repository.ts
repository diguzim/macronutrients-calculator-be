import { Model, ObjectId } from 'mongoose';
import { CookedDishRepository } from '../../../../@core/domain/cooked-dish/cooked-dish.repository';
import { CookedDish } from '../../../../@core/domain/cooked-dish/cooked-dish.entity';

export class MongooseCookedDishRepository implements CookedDishRepository {
  constructor(private readonly cookedDishModel: Model<CookedDish>) {}

  async insert(cookedDish: CookedDish): Promise<CookedDish> {
    const result = await this.cookedDishModel.create({
      name: cookedDish.name,
      protein_ratio: cookedDish.protein_ratio,
      fat_ratio: cookedDish.fat_ratio,
      carbohydrate_ratio: cookedDish.carbohydrate_ratio,
      fiber_ratio: cookedDish.fiber_ratio,
      kcal_per_gram: cookedDish.kcal_per_gram,
    });
    const id = (result['_id'] as ObjectId).toString();

    cookedDish.id = id;

    return cookedDish;
  }

  async findAll(): Promise<CookedDish[]> {
    // TODO: implement
    return [];
  }

  async findOne(id: string): Promise<CookedDish | null> {
    return await this.cookedDishModel.findById(id).exec();
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
