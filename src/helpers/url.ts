import { DOMAIN } from 'src/constants/divan';
import { TCategory } from 'src/types/categories';

export function getUrl(path: string): string {
  return `${DOMAIN}${path}`;
}

export function getCategoryUrl(code: TCategory['code']): string {
  return getUrl(`/category/stok-mebeli?categories=${code}`);
}
export function getCategoryWithPageUrl(
  code: TCategory['code'],
  page: number,
): string {
  return getUrl(`/category/stok-mebeli/page-${page}?categories=${code}`);
}
