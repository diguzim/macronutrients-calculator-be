import { MacroNutrient } from '../../../utils/enums/macro-nutrients.enum';
import {
  MacroNutrientRatioGreaterThanOneError,
  MacroNutrientRatioLessThanOneError,
  NegativeCaloriesError,
} from '../../../utils/errors';
import {
  NutritionalEntity,
  NutritionalEntityProps,
} from './nutritional-entity.entity';

class NutritionalEntityImplementation extends NutritionalEntity {
  constructor(props: NutritionalEntityProps) {
    super(props);
  }
}

describe('NutritionalEntity', () => {
  it('should create a NutritionalEntity when ratios are valid', () => {
    const nutritionalEntity = new NutritionalEntityImplementation({
      protein_ratio: 0.3,
      fat_ratio: 0.3,
      carbohydrate_ratio: 0.3,
      fiber_ratio: 0.1,
      kcal_per_gram: 4,
    });

    expect(nutritionalEntity).toBeInstanceOf(NutritionalEntity);

    const nutritionalSnapshot =
      nutritionalEntity.calculateNutritionalSnapshot(100);
    expect(nutritionalSnapshot).toEqual({
      protein: 30,
      fat: 30,
      carbohydrate: 30,
      fiber: 10,
      kcal: 400,
    });

    expect(nutritionalEntity.isRatioSumOne()).toBe(true);
    expect(nutritionalEntity.isRatioSumMoreThanOne()).toBe(false);
    expect(nutritionalEntity.isRatioSumLessThanOne()).toBe(false);

    nutritionalEntity.protein_ratio = 0.5;
    expect(nutritionalEntity.isRatioSumOne()).toBe(false);
    expect(nutritionalEntity.isRatioSumMoreThanOne()).toBe(true);
    expect(nutritionalEntity.isRatioSumLessThanOne()).toBe(false);

    nutritionalEntity.protein_ratio = 0.1;
    expect(nutritionalEntity.isRatioSumOne()).toBe(false);
    expect(nutritionalEntity.isRatioSumMoreThanOne()).toBe(false);
    expect(nutritionalEntity.isRatioSumLessThanOne()).toBe(true);
  });

  it('should throw an error when protein ratio is less than zero', () => {
    expect(() => {
      new NutritionalEntityImplementation({
        protein_ratio: -0.1,
        fat_ratio: 0.3,
        carbohydrate_ratio: 0.3,
        fiber_ratio: 0.1,
        kcal_per_gram: 4,
      });
    }).toThrowError(
      new MacroNutrientRatioLessThanOneError(MacroNutrient.Protein),
    );
  });

  it('should throw an error when fat ratio is less than zero', () => {
    expect(() => {
      new NutritionalEntityImplementation({
        protein_ratio: 0.3,
        fat_ratio: -0.1,
        carbohydrate_ratio: 0.3,
        fiber_ratio: 0.1,
        kcal_per_gram: 4,
      });
    }).toThrowError(new MacroNutrientRatioLessThanOneError(MacroNutrient.Fat));
  });

  it('should throw an error when carbohydrate ratio is less than zero', () => {
    expect(() => {
      new NutritionalEntityImplementation({
        protein_ratio: 0.3,
        fat_ratio: 0.3,
        carbohydrate_ratio: -0.1,
        fiber_ratio: 0.1,
        kcal_per_gram: 4,
      });
    }).toThrowError(
      new MacroNutrientRatioLessThanOneError(MacroNutrient.Carbohydrate),
    );
  });

  it('should throw an error when fiber ratio is less than zero', () => {
    expect(() => {
      new NutritionalEntityImplementation({
        protein_ratio: 0.3,
        fat_ratio: 0.3,
        carbohydrate_ratio: 0.3,
        fiber_ratio: -0.1,
        kcal_per_gram: 4,
      });
    }).toThrowError(
      new MacroNutrientRatioLessThanOneError(MacroNutrient.Fiber),
    );
  });

  it('should throw an error when calories are less than zero', () => {
    expect(() => {
      new NutritionalEntityImplementation({
        protein_ratio: 0.3,
        fat_ratio: 0.3,
        carbohydrate_ratio: 0.3,
        fiber_ratio: 0.1,
        kcal_per_gram: -1,
      });
    }).toThrowError(new NegativeCaloriesError());
  });

  it('should throw an error when protein ratio is greater than one', () => {
    expect(() => {
      new NutritionalEntityImplementation({
        protein_ratio: 1.1,
        fat_ratio: 0.3,
        carbohydrate_ratio: 0.3,
        fiber_ratio: 0.1,
        kcal_per_gram: 4,
      });
    }).toThrowError(
      new MacroNutrientRatioGreaterThanOneError(MacroNutrient.Protein),
    );
  });

  it('should throw an error when fat ratio is greater than one', () => {
    expect(() => {
      new NutritionalEntityImplementation({
        protein_ratio: 0.3,
        fat_ratio: 1.1,
        carbohydrate_ratio: 0.3,
        fiber_ratio: 0.1,
        kcal_per_gram: 4,
      });
    }).toThrowError(
      new MacroNutrientRatioGreaterThanOneError(MacroNutrient.Fat),
    );
  });

  it('should throw an error when carbohydrate ratio is greater than one', () => {
    expect(() => {
      new NutritionalEntityImplementation({
        protein_ratio: 0.3,
        fat_ratio: 0.3,
        carbohydrate_ratio: 1.1,
        fiber_ratio: 0.1,
        kcal_per_gram: 4,
      });
    }).toThrowError(
      new MacroNutrientRatioGreaterThanOneError(MacroNutrient.Carbohydrate),
    );
  });

  it('should throw an error when fiber ratio is greater than one', () => {
    expect(() => {
      new NutritionalEntityImplementation({
        protein_ratio: 0.3,
        fat_ratio: 0.3,
        carbohydrate_ratio: 0.3,
        fiber_ratio: 1.1,
        kcal_per_gram: 4,
      });
    }).toThrowError(
      new MacroNutrientRatioGreaterThanOneError(MacroNutrient.Fiber),
    );
  });
});
