import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Product, ProductSchema } from 'src/schemas/product.schema';
import { ProductService } from './product.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Product.name, schema: ProductSchema }]),
    MongooseModule.forRoot('mongodb://localhost:27017/divan?authSource=admin'),
  ],
  providers: [ProductService],
  exports: [ProductService],
})
export class ProductModule {}
