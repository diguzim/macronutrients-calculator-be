import { mockedMeal } from '../../../utils/test/mocked.entities';
import { GetMealsUseCase } from './get-meals.use-case';

describe('GetMealsUseCase', () => {
  let getMealsUseCase: GetMealsUseCase;

  const mockMealRepository = {
    findAllBy: jest.fn(() => [mockedMeal]),
  };

  const params = {
    name: 'Some meal name',
  };
  const userId = 'userId';

  beforeEach(() => {
    getMealsUseCase = new GetMealsUseCase(mockMealRepository as any);
  });

  it('should return meals', async () => {
    const result = await getMealsUseCase.execute(params, userId);

    expect(result).toEqual([mockedMeal]);
    expect(mockMealRepository.findAllBy).toHaveBeenCalledWith({
      ...params,
      userId,
    });
  });
});
