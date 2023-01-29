import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { TProduct } from 'src/modules/parser/types/fetch-product';

export type ProductDocument = HydratedDocument<Product>;

@Schema({ timestamps: true })
export class Product {
  @Prop({ required: true })
  category: string;

  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  ulr: string;

  @Prop({ required: true, unique: true })
  atr: string;

  @Prop({ required: true })
  price: number;

  @Prop({ required: true })
  oldPrice: number;

  @Prop({ required: true })
  imageUlr: string;

  @Prop({ required: true, defaultValue: false })
  isDeleted: boolean;
}

export const ProductSchema = SchemaFactory.createForClass(Product);

ProductSchema.statics.updateByCategory = updateByCategory;
async function updateByCategory(
  category: ProductDocument['category'],
  products: TProduct[],
) {
  const updateResult = await this.updateMany(
    { category },
    { isDeleted: true },
    { rawResult: true },
  );
  this.logger.log(updateResult);
  for (const { atr, ...product } of products) {
    const updateResult = await this.productModel.updateOne(
      { atr },
      { ...product, isDeleted: true },
      { upsert: true, rawResult: true },
    );
    this.logger.log(updateResult);
  }
}
