import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type ProductDocument = HydratedDocument<Product>;

@Schema({ timestamps: true })
export class Product {
  @Prop({ required: true })
  category: string;

  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  url: string;

  @Prop({ required: true, unique: true })
  atr: string;

  @Prop({ required: true })
  price: number;

  @Prop({ required: true })
  oldPrice: number;

  @Prop()
  imageUlr: string;

  @Prop({ required: true, defaultValue: false })
  isDeleted: boolean;
}

export const ProductSchema = SchemaFactory.createForClass(Product);
