export function parsePrice(p: string): number {
  return Number(p?.replace(' ', '') || 0);
}
