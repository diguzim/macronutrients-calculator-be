export class NegativeCaloriesError extends Error {
  constructor() {
    const message = 'Calories cannot be negative.';

    super(message);
  }
}
