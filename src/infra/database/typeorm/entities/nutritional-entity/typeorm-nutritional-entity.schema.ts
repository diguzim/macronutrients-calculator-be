import { EntitySchemaColumnOptions } from 'typeorm';

export const NutritionalEntitySchemaPart = {
  proteinRatio: {
    type: Number,
  } as EntitySchemaColumnOptions,
  fatRatio: {
    type: Number,
  } as EntitySchemaColumnOptions,
  carbohydrateRatio: {
    type: Number,
  } as EntitySchemaColumnOptions,
  fiberRatio: {
    type: Number,
  } as EntitySchemaColumnOptions,
  kcalPerGram: {
    type: Number,
  } as EntitySchemaColumnOptions,
};
