import { Logger, Module } from '@nestjs/common';

import { ParserModule } from './modules/parser/parser.module';
import { ProductModule } from './modules/product/product.module';

@Module({
  providers: [Logger],
  imports: [ProductModule, ParserModule],
})
export class AppModule {}
