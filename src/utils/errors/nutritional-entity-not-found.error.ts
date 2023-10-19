import { NutritionalEntityType } from '../enums/nutritional-entity-type.enum';

export class NutritionalEntityNotFoundError extends Error {
  type: NutritionalEntityType;
  id: string;

  constructor(type: NutritionalEntityType, id: string) {
    const message = `Nutritional entity of type ${type} with id ${id} not found.`;

    super(message);
    this.type = type;
    this.id = id;
  }
}
