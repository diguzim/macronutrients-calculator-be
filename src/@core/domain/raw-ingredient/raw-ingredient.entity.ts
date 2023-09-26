import {
  NutritionalEntity,
  NutritionalEntityProps,
} from '../nutritional-entity/nutritional-entity.entity';

export type RawIngredientProps = NutritionalEntityProps & {
  id?: string;
  name: string;
};

export class RawIngredient extends NutritionalEntity {
  private _id?: string;
  private _name: string;

  private constructor(props: RawIngredientProps) {
    super(props);
    this._id = props.id;
    this._name = props.name;
  }

  public static create(props: RawIngredientProps): RawIngredient {
    const rawIngredient = new RawIngredient(props);
    return rawIngredient;
  }

  get id(): string | undefined {
    return this._id;
  }

  set id(value: string | undefined) {
    this._id = value;
  }

  get name(): string {
    return this._name;
  }

  set name(value: string) {
    this._name = value;
  }
}
