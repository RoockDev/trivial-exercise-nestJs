import { Module } from '@nestjs/common';
import { ScoresService } from './score.service';
import { ScoresController } from './score.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Score, ScoreSchema } from './entities/score.entity';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [
   
    MongooseModule.forFeature([{ name: Score.name, schema: ScoreSchema }]),AuthModule,
  ],
  controllers: [ScoresController],
  providers: [ScoresService],
})
export class ScoresModule {}
