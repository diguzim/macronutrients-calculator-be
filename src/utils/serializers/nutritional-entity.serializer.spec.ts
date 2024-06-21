import { NutritionalEntity } from '../../core/domain/nutritional-entity/nutritional-entity.entity';
import { NutritionalEntitySerializer } from './nutritional-entity.serializer';

describe('NutritionalEntitySerializer', () => {
  describe('serialize', () => {
    it('should serialize a nutritional entity', () => {
      class ConcreteNutritionalEntity extends NutritionalEntity {
        constructor(ratios) {
          super({ ...ratios });
        }
      }

      const ratios = {
        proteinRatio: 0.1,
        fatRatio: 0.2,
        carbohydrateRatio: 0.3,
        fiberRatio: 0.4,
        kcalPerGram: 0.5,
      };

      const nutritionalEntity = new ConcreteNutritionalEntity(ratios);

      const serializedNutritionalEntity =
        NutritionalEntitySerializer.serialize(nutritionalEntity);
      expect(serializedNutritionalEntity).toEqual({
        proteinRatio: 0.1,
        fatRatio: 0.2,
        carbohydrateRatio: 0.3,
        fiberRatio: 0.4,
        kcalPerGram: 0.5,
      });
    });
  });
});
