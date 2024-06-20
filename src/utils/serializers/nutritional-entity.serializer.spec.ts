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
        protein_ratio: 0.1,
        fat_ratio: 0.2,
        carbohydrate_ratio: 0.3,
        fiber_ratio: 0.4,
        kcal_per_gram: 0.5,
      };

      const nutritionalEntity = new ConcreteNutritionalEntity(ratios);

      const serializedNutritionalEntity =
        NutritionalEntitySerializer.serialize(nutritionalEntity);
      expect(serializedNutritionalEntity).toEqual({
        protein_ratio: 0.1,
        fat_ratio: 0.2,
        carbohydrate_ratio: 0.3,
        fiber_ratio: 0.4,
        kcal_per_gram: 0.5,
      });
    });
  });
});
