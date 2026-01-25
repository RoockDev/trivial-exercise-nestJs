import { Module } from '@nestjs/common';
import { TrivialModule } from './trivial/trivial.module';

@Module({
  imports: [TrivialModule],
  controllers: [],
  providers: [],
})
export class AppModule {}