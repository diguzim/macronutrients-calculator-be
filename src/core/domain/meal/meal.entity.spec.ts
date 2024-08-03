import { Item, ItemType } from '../item/item.entity';
import { Meal } from './meal.entity';

describe('Meal', () => {
  describe('constructor', () => {
    it('creates an instance of Meal with all fields', () => {
      const date = new Date();

      const meal = new Meal({
        id: '1',
        name: 'meal',
        protein: 10,
        fat: 20,
        carbohydrate: 30,
        fiber: 40,
        kcal: 1000,
        createdAt: date,
        updatedAt: date,
      });

      expect(meal).toBeInstanceOf(Meal);

      expect(meal.id).toBe('1');
      expect(meal.name).toBe('meal');
      expect(meal.protein).toBe(10);
      expect(meal.fat).toBe(20);
      expect(meal.carbohydrate).toBe(30);
      expect(meal.fiber).toBe(40);
      expect(meal.kcal).toBe(1000);
      expect(meal.createdAt).toBe(date);
      expect(meal.updatedAt).toBe(date);
    });

    it('creates an instance of Meal without id, createdAt, updatedAt', () => {
      const meal = new Meal({
        name: 'meal',
        protein: 10,
        fat: 20,
        carbohydrate: 30,
        fiber: 40,
        kcal: 1000,
      });

      expect(meal).toBeInstanceOf(Meal);
    });
  });

  describe('createFromItems', () => {
    it('creates an instance of Meal with correct ratios', () => {
      const meal = Meal.createFromItems(
        'meal',
        [
          {
            item: new Item({
              name: 'item 1',
              type: ItemType.RAW,
              proteinRatio: 0.1,
              fatRatio: 0.1,
              carbohydrateRatio: 0.1,
              fiberRatio: 0.1,
              kcalPerGram: 1,
            }),
            weight: 100,
          },
          {
            item: new Item({
              name: 'item 2',
              type: ItemType.RECIPE,
              proteinRatio: 0.4,
              fatRatio: 0.4,
              carbohydrateRatio: 0.4,
              fiberRatio: 0.4,
              kcalPerGram: 4,
            }),
            weight: 200,
          },
        ],
        'userId',
      );

      expect(meal).toBeInstanceOf(Meal);

      expect(meal.name).toBe('meal');
      expect(meal.protein).toBe(90);
      expect(meal.fat).toBe(90);
      expect(meal.carbohydrate).toBe(90);
      expect(meal.fiber).toBe(90);
      expect(meal.kcal).toBe(900);
      expect(meal.userId).toBe('userId');
    });
  });
});
