import { FindOptionsWhere, Repository } from 'typeorm';
import { MealRepository } from '../../../../../core/domain/meal/meal.repository';
import { Meal } from '../../../../../core/domain/meal/meal.entity';

export class TypeormMealRepository implements MealRepository {
  constructor(private readonly mealRepository: Repository<Meal>) {}

  async create(meal: Meal): Promise<Meal> {
    return this.mealRepository.save(meal);
  }

  // This is a study in order to allow the repository to return the entity with its relations
  async findBy(
    params: Partial<Meal>,
    loadRelations: string[] = [],
  ): Promise<Meal | null> {
    const result = await this.mealRepository.findOne({
      where: params as FindOptionsWhere<Meal>,
      relations: loadRelations,
    });

    const relations = await Promise.all(
      loadRelations.map((relation) => {
        return result[relation];
      }),
    );

    return result
      ? this.toEntity(
          this.joinResultWithRelations(result, relations, loadRelations),
        )
      : null;
  }

  async findAllBy(params: Partial<Meal>): Promise<Meal[]> {
    const results = await this.mealRepository.find({
      where: params as FindOptionsWhere<Meal>,
    });

    return results.map((result) => this.toEntity(result));
  }

  private joinResultWithRelations(
    result: Meal,
    relations: any[],
    loadRelations: string[],
  ) {
    return {
      ...result,
      ...relations.reduce((acc, relation, index) => {
        return { ...acc, [loadRelations[index]]: relation };
      }, {}),
    };
  }

  private toEntity(meal: Meal): Meal {
    return new Meal(meal);
  }
}
