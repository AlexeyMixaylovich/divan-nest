import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { HydratedDocument } from 'mongoose';

export type ProductDocument = HydratedDocument<Product>;

@Schema({
  timestamps: true,
})
export class Product {
  @ApiProperty()
  _id: string;
  @ApiProperty()
  @Prop({ required: true })
  category: string;

  @ApiProperty()
  @Prop({ required: true })
  name: string;

  @ApiProperty()
  @Prop({ required: true })
  url: string;

  @ApiProperty()
  @Prop({ required: true, unique: true })
  atr: string;

  @ApiProperty()
  @Prop({ required: true })
  price: number;

  @ApiProperty()
  @Prop({ required: true })
  oldPrice: number;

  @ApiProperty()
  @Prop()
  imageUlr: string;

  @ApiProperty()
  @Prop({ required: true, defaultValue: false })
  isDeleted: boolean;
}

export const ProductSchema = SchemaFactory.createForClass(Product);
