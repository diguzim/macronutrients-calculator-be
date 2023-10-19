import { MacroNutrient } from '../enums/macro-nutrients.enum';

export class MacroNutrientRatioGreaterThanOneError extends Error {
  macroNutrient: MacroNutrient;

  constructor(macroNutrient: MacroNutrient) {
    const message = `Macro nutrient ratio for ${macroNutrient} is greater than one.`;

    super(message);
    this.macroNutrient = macroNutrient;
  }
}
