const DEFAULT_DECIMAL_PLACES = 10;

export function approximatelyGreaterThan(
  a: number,
  b: number,
  decimalPlaces = DEFAULT_DECIMAL_PLACES,
): boolean {
  const aParsed = parseFloat(a.toFixed(decimalPlaces));
  const bParsed = parseFloat(b.toFixed(decimalPlaces));

  return aParsed > bParsed;
}

export function approximatelyLessThan(
  a: number,
  b: number,
  decimalPlaces = DEFAULT_DECIMAL_PLACES,
): boolean {
  const aParsed = parseFloat(a.toFixed(decimalPlaces));
  const bParsed = parseFloat(b.toFixed(decimalPlaces));

  return aParsed < bParsed;
}

export function approximatelyEqual(
  a: number,
  b: number,
  decimalPlaces = DEFAULT_DECIMAL_PLACES,
): boolean {
  const aParsed = parseFloat(a.toFixed(decimalPlaces));
  const bParsed = parseFloat(b.toFixed(decimalPlaces));

  return aParsed === bParsed;
}

export function approximatelyParseFloat(
  a: number,
  decimalPlaces = DEFAULT_DECIMAL_PLACES,
): number {
  return parseFloat(a.toFixed(decimalPlaces));
}
