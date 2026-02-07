import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { TransformInterceptor } from './common/interceptors/transform.interceptor';
import { GlobalExceptionFilter } from './common/http-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  

  // whitelist: true -> Si te mandan datos extra que no están en el DTO, los borra.
  // forbidNonWhitelisted: true -> Si te mandan datos extra, da error (400 Bad Request).
  // transform: true -> Convierte tipos automáticamente (ej: string "1" a number 1).
  app.useGlobalPipes(new ValidationPipe({ 
    whitelist: true, 
    forbidNonWhitelisted: true,
    transform: true 
  }));

  app.useGlobalInterceptors(new TransformInterceptor());
  app.useGlobalFilters(new GlobalExceptionFilter());
  app.enableCors();

  await app.listen(process.env.PORT ?? 3000);

  


}
bootstrap();
