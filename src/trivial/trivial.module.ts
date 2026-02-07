import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TrivialService } from './trivial.service';
import { TrivialController } from './trivial.controller';
import { Trivial, TrivialSchema } from './entities/trivial.entity';
import { AuthModule } from '../auth/auth.module';

@Module({
 imports: [
    
    MongooseModule.forFeature([
      {
        name: Trivial.name,
        schema: TrivialSchema,
      },
    ]),AuthModule,
  ],
  controllers: [TrivialController],
  providers: [TrivialService],

  exports: [TrivialService]
})
export class TrivialModule {}
