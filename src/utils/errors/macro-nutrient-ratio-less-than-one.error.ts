import { MacroNutrient } from '../enums/macro-nutrients.enum';

export class MacroNutrientRatioLessThanOneError extends Error {
  private readonly macroNutrient: MacroNutrient;

  constructor(macroNutrient: MacroNutrient) {
    const message = `Macro nutrient ratio for ${macroNutrient} is less than zero.`;

    super(message);
    this.macroNutrient = macroNutrient;
  }
}
