import { EntitySchemaColumnOptions } from 'typeorm';

export const NutritionalEntitySchemaPart = {
  proteinRatio: {
    type: 'float',
  } as EntitySchemaColumnOptions,
  fatRatio: {
    type: 'float',
  } as EntitySchemaColumnOptions,
  carbohydrateRatio: {
    type: 'float',
  } as EntitySchemaColumnOptions,
  fiberRatio: {
    type: 'float',
  } as EntitySchemaColumnOptions,
  kcalPerGram: {
    type: 'float',
  } as EntitySchemaColumnOptions,
};
