import { Test, TestingModule } from '@nestjs/testing';
import { CookedIngredientsController } from './cooked-ingredients.controller';
import { CreateRawIngredientFromAbsoluteValuesUseCase } from '../../../../@core/application/raw-ingredient/create-raw-ingredient-from-absolute-values.use-case';

describe('CookedIngredientsController', () => {
  let controller: CookedIngredientsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CookedIngredientsController],
      providers: [
        {
          provide: CreateRawIngredientFromAbsoluteValuesUseCase,
          useValue: {},
        },
      ],
    }).compile();

    controller = module.get<CookedIngredientsController>(
      CookedIngredientsController,
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
