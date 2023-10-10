import { Test, TestingModule } from '@nestjs/testing';
import { RawIngredientsController } from './raw-ingredients.controller';

describe('RawIngredientsController', () => {
  let controller: RawIngredientsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RawIngredientsController],
    }).compile();

    controller = module.get<RawIngredientsController>(RawIngredientsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
