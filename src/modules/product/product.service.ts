import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { LeanDocument, Model } from 'mongoose';
import { Product, ProductDocument } from 'src/schemas/product.schema';
import { TCategory } from 'src/types/categories';
import { TProduct } from '../parser/types/fetch-product';
import { EDirection } from './constants/sort-direction';
import { ESortField } from './constants/sort-field';
import { TGetProductsArguments } from './types/product-list';

@Injectable()
export class ProductService {
  constructor(
    @InjectModel(Product.name) private productModel: Model<ProductDocument>,
  ) {}

  async updateByCategory(
    category: TCategory['code'],
    products: TProduct[],
  ): Promise<void> {
    for (const { atr, ...product } of products) {
      const productFromDB = await this.productModel.findOne({ atr, category });
      if (productFromDB) {
        productFromDB.set({ ...product, isDeleted: false });
        await productFromDB.save();
      } else {
        // новый товар
        await this.productModel.create({
          ...product,
          atr,
          category,
          isDeleted: false,
        });
      }
    }
  }
  async setIsDeletedByCategory(category: TCategory['code']): Promise<void> {
    await this.productModel.updateMany(
      { category },
      { isDeleted: true },
      { rawResult: true },
    );
  }
  updateImgCursor() {
    return this.productModel.find({ imageUlr: { $exists: false } }).cursor();
  }

  async getProducts({
    navigate,
    filters = {},
    sort = [],
  }: TGetProductsArguments): Promise<{
    products: LeanDocument<ProductDocument>[];
    total: number;
  }> {
    const products = await this.productModel
      .find(filters)
      .skip(navigate.skip)
      .limit(navigate.limit || 100)
      .sort(
        sort.reduce(
          (t, { direction, field }) => {
            t[field] = direction;
            return t;
          },
          {
            [ESortField.UPDATED_AT]: EDirection.ASC,
          } as Record<ESortField, EDirection>,
        ),
      )
      .lean();

    const total = await this.productModel.count(filters);
    return { products, total };
  }
}
