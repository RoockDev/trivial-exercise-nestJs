import { Module } from '@nestjs/common';
import { TrivialModule } from './trivial/trivial.module';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { ScoresModule } from './scores/score.module';
import { GameModule } from './game/game.module';


@Module({
  imports: [TrivialModule,
    ConfigModule.forRoot({
              isGlobal: true, 
           }),
            MongooseModule.forRoot(`mongodb://${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`,),
            TrivialModule,
            UsersModule,
            AuthModule,
            ScoresModule,
            GameModule,
            
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}