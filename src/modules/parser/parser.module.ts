import { Module } from '@nestjs/common';
import { ProductModule } from '../product/product.module';
import { ParserService } from './parser.service';

@Module({
  imports: [ProductModule],
  providers: [ParserService],
  exports: [ParserService],
})
export class ParserModule {}
