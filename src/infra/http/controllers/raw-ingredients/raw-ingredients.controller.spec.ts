import { Test, TestingModule } from '@nestjs/testing';
import { RawIngredientsController } from './raw-ingredients.controller';
import { CreateRawIngredientFromAbsoluteValuesUseCase } from '../../../../core/application/raw-ingredient/create-raw-ingredient-from-absolute-values.use-case';

describe('RawIngredientsController', () => {
  let controller: RawIngredientsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RawIngredientsController],
      providers: [
        {
          provide: CreateRawIngredientFromAbsoluteValuesUseCase,
          useValue: {},
        },
      ],
    }).compile();

    controller = module.get<RawIngredientsController>(RawIngredientsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
