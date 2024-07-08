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
});
