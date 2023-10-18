import { Test, TestingModule } from '@nestjs/testing';
import { CookedIngredientsController } from './cooked-ingredients.controller';
import { CreateCookedIngredientFromRawIngredientUseCase } from '../../../../@core/application/cooked_ingredient/create-cooked-ingredient-from-raw-ingredient.use-case';

describe('CookedIngredientsController', () => {
  let controller: CookedIngredientsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CookedIngredientsController],
      providers: [
        {
          provide: CreateCookedIngredientFromRawIngredientUseCase,
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
