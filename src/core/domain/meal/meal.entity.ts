type MealProps = {
  id?: string;
  name: string;
  protein: number;
  fat: number;
  carbohydrate: number;
  fiber: number;
  kcal: number;
  createdAt?: Date;
  updatedAt?: Date;
};

export class Meal {
  id?: string;
  name: string;
  protein: number;
  fat: number;
  carbohydrate: number;
  fiber: number;
  kcal: number;
  createdAt?: Date;
  updatedAt?: Date;

  constructor(props: MealProps) {
    Object.assign(this, props);
  }
}
