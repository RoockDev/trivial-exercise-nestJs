import { Module } from '@nestjs/common';
import { TrivialModule } from './trivial/trivial.module';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [TrivialModule,
    ConfigModule.forRoot({
              isGlobal: true, // Esto carga automáticamente el .env usando dotenv por dentro. Disponible en toda la app
           }),
            MongooseModule.forRoot(`mongodb://${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`,)

  ],
  controllers: [],
  providers: [],
})
export class AppModule {}