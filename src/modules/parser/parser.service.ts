import { Injectable } from '@nestjs/common';
import axios from 'axios';
import { get } from 'lodash';

import { HTMLElement, parse } from 'node-html-parser';
import { CATEGORIES } from 'src/constants/categories';

import {
  getCategoryUrl,
  getCategoryWithPageUrl,
  getUrl,
} from 'src/helpers/url';
import { ProductService } from '../product/product.service';
import { EProductPath } from './constants/product-path';
import { parsePrice } from './helpers/price';
import { TProduct } from './types/fetch-product';

@Injectable()
export class ParserService {
  constructor(private readonly productService: ProductService) {}

  private async getImageUrl(url: string): Promise<string> {
    const { data } = await axios.get(url);
    const meta = parse(data)
      .getElementsByTagName('meta')
      .find((el) => el?.attrs?.property === 'og:image');
    return meta?.attrs?.content || '';
  }

  private parsePropducts(html: HTMLElement): TProduct[] {
    const products = html
      .querySelectorAll('.lsooF')
      .map((el) => this.parsePropduct(el));
    return products;
  }

  private parsePropduct(productHtml: HTMLElement): TProduct {
    const name = get(productHtml, EProductPath.NAME)?.trim();
    const href: string = get(productHtml, EProductPath.HREF);
    const price = get(productHtml, EProductPath.PRICE)?.trim();
    const oldPrice = get(productHtml, EProductPath.OLD_PRICE)?.trim();
    const res = {
      name,
      url: getUrl(href),
      atr: href.split('art--').pop(),
      price: parsePrice(price),
      oldPrice: parsePrice(oldPrice),
    };

    return res;
  }

  private getPageCount(html: HTMLElement): number {
    const { childNodes } = html.querySelector('.dqBvL');
    const page = childNodes[childNodes.length - 2]?.text;
    return Number(page) || 1;
  }

  async parseData() {
    for (const { code } of CATEGORIES) {
      await this.productService.setIsDeletedByCategory(code);

      const url = getCategoryUrl(code);
      const { data } = await axios.get(url);
      const html = parse(data);

      const pageCount = this.getPageCount(html);
      const products = this.parsePropducts(html);

      await this.productService.updateByCategory(code, products);
      if (pageCount > 1) {
        for (let page = 2; page <= pageCount; page++) {
          const url = getCategoryWithPageUrl(code, page);

          const { data } = await axios.get(url);
          const products = this.parsePropducts(parse(data));
          await this.productService.updateByCategory(code, products);
        }
      }
    }
  }
}