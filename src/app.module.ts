import { Logger, Module } from '@nestjs/common';
import { ApiModule } from './modules/api/api.module';

@Module({
  providers: [Logger],
  imports: [ApiModule],
})
export class AppModule {}
