import { Module } from '@nestjs/common';
import { ParserModule } from '../parser/parser.module';
import { ProductModule } from '../product/product.module';
import { ApiController } from './api.controller';

@Module({
  imports: [ParserModule, ProductModule],
  controllers: [ApiController],
})
export class ApiModule {}
