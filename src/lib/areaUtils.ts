export function getNumber(value: string): number {
  const num = parseFloat(value);
  if (isNaN(num)) throw new Error("Invalid number");
  return num;
}

export function triangleArea(b: number, h: number) {
  return 0.5 * b * h;
}

export function rectangleArea(w: number, l: number) {
  return w * l;
}

export function parallelogramArea(b: number, h: number) {
  return b * h;
}

export function rhombusArea(d1: number, d2: number) {
  return 0.5 * d1 * d2;
}

export function pentagonArea(p: number, a: number) {
  return 0.5 * p * a;
}

export function ellipseArea(a: number, b: number) {
  return +(Math.PI * a * b).toFixed(2);
}

export function formatArea(area: number): string {
  const rounded = Number(area.toFixed(4));
  return Number.isFinite(rounded) ? rounded.toLocaleString("en-US", { maximumFractionDigits: 4 }) : "0";
}
