import { Module } from '@nestjs/common';
import { GameService } from './game.service';
import { GameController } from './game.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Game, GameSchema } from './entities/game.entity';
import { Trivial, TrivialSchema } from '../trivial/entities/trivial.entity';
import { Score, ScoreSchema } from '../scores/entities/score.entity';
import { AuthModule } from '../auth/auth.module';


@Module({
  imports: [
   
    MongooseModule.forFeature([
      { name: Game.name, schema: GameSchema },       
      { name: Trivial.name, schema: TrivialSchema }, 
      { name: Score.name, schema: ScoreSchema }      
    ]),
    AuthModule 
  ],
  controllers: [GameController],
  providers: [GameService],
})
export class GameModule {}
