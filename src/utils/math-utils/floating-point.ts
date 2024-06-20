export function approximatelyGreaterThan(
  a: number,
  b: number,
  decimalPlaces = 10,
): boolean {
  const aParsed = parseFloat(a.toFixed(decimalPlaces));
  const bParsed = parseFloat(b.toFixed(decimalPlaces));

  return aParsed > bParsed;
}

export function approximatelyLessThan(
  a: number,
  b: number,
  decimalPlaces = 10,
): boolean {
  const aParsed = parseFloat(a.toFixed(decimalPlaces));
  const bParsed = parseFloat(b.toFixed(decimalPlaces));

  return aParsed < bParsed;
}

export function approximatelyEqual(
  a: number,
  b: number,
  decimalPlaces = 10,
): boolean {
  const aParsed = parseFloat(a.toFixed(decimalPlaces));
  const bParsed = parseFloat(b.toFixed(decimalPlaces));

  return aParsed === bParsed;
}
