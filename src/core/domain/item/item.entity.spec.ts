import { Item, ItemType } from './item.entity';

describe('Item', () => {
  describe('constructor', () => {
    it('creates an instance of Item with all fields', () => {
      const date = new Date();

      const item = new Item({
        id: '1',
        name: 'item',
        type: ItemType.RAW,
        proteinRatio: 0.1,
        fatRatio: 0.2,
        carbohydrateRatio: 0.3,
        fiberRatio: 0.4,
        kcalPerGram: 10,
        createdAt: date,
        updatedAt: date,
      });

      expect(item).toBeInstanceOf(Item);

      expect(item.id).toBe('1');
      expect(item.name).toBe('item');
      expect(item.proteinRatio).toBe(0.1);
      expect(item.fatRatio).toBe(0.2);
      expect(item.carbohydrateRatio).toBe(0.3);
      expect(item.fiberRatio).toBe(0.4);
      expect(item.kcalPerGram).toBe(10);
      expect(item.createdAt).toBe(date);
      expect(item.updatedAt).toBe(date);
    });

    it('creates an instance of Item without id, createdAt, updatedAt', () => {
      const item = new Item({
        name: 'item',
        type: ItemType.RECIPE,
        proteinRatio: 0.1,
        fatRatio: 0.2,
        carbohydrateRatio: 0.3,
        fiberRatio: 0.4,
        kcalPerGram: 10,
      });

      expect(item).toBeInstanceOf(Item);
    });
  });

  describe('createFromAbsoluteValues', () => {
    it('creates an instance of Item with correct ratios', () => {
      const item = Item.createFromAbsoluteValues({
        name: 'item',
        type: ItemType.RAW,
        weight: 100,
        protein: 10,
        fat: 20,
        carbohydrate: 30,
        fiber: 40,
        kcal: 1000,
      });

      expect(item).toBeInstanceOf(Item);

      expect(item.name).toBe('item');
      expect(item.type).toBe(ItemType.RAW);
      expect(item.proteinRatio).toBe(0.1);
      expect(item.fatRatio).toBe(0.2);
      expect(item.carbohydrateRatio).toBe(0.3);
      expect(item.fiberRatio).toBe(0.4);
      expect(item.kcalPerGram).toBe(10);
    });
  });

  describe('createFromComposition', () => {
    it('creates an instance of Item with correct ratios', () => {
      const item = Item.createFromComposition(
        'composite item',
        [
          {
            item: new Item({
              name: 'item 1',
              type: ItemType.RAW,
              proteinRatio: 0.1,
              fatRatio: 0.1,
              carbohydrateRatio: 0.1,
              fiberRatio: 0.1,
              kcalPerGram: 10,
            }),
            weight: 100,
          },
          {
            item: new Item({
              name: 'item 2',
              type: ItemType.RAW,
              proteinRatio: 0.4,
              fatRatio: 0.4,
              carbohydrateRatio: 0.4,
              fiberRatio: 0.4,
              kcalPerGram: 40,
            }),
            weight: 200,
          },
        ],
        600,
      );

      expect(item).toBeInstanceOf(Item);

      expect(item.name).toBe('composite item');
      expect(item.type).toBe(ItemType.RECIPE);
      expect(item.proteinRatio).toBe(0.15);
      expect(item.fatRatio).toBe(0.15);
      expect(item.carbohydrateRatio).toBe(0.15);
      expect(item.fiberRatio).toBe(0.15);
      expect(item.kcalPerGram).toBe(15);
    });
  });
});
