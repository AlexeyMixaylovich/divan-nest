import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Product, ProductDocument } from 'src/schemas/product.schema';
import { TCategory } from 'src/types/categories';
import { TProduct } from '../parser/types/fetch-product';

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
      if (product) {
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
}
