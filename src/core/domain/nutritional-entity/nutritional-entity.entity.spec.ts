import { NutritionalEntity } from './nutritional-entity.entity';

describe('NutritionalEntity', () => {
  const nutritionalEntity = new (class extends NutritionalEntity {
    constructor() {
      super({
        proteinRatio: 0.1,
        fatRatio: 0.2,
        carbohydrateRatio: 0.3,
        fiberRatio: 0.4,
        kcalPerGram: 10,
      });
    }
  })();

  describe('calculateNutritionalSnapshot', () => {
    describe('when weight is 100', () => {
      it('returns NutritionalSnapshot', () => {
        expect(nutritionalEntity.calculateNutritionalSnapshot(100)).toEqual({
          protein: 10,
          fat: 20,
          carbohydrate: 30,
          fiber: 40,
          kcal: 1000,
        });
      });
    });
  });

  describe('ratioSum', () => {
    it('returns 1', () => {
      expect(nutritionalEntity.ratioSum()).toBe(1);
    });
  });
});
