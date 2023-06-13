import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { TransformInterceptor } from './transform.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule); //creatine a new nest js app
  app.useGlobalPipes(new ValidationPipe()); //Implementing global validation on the Application level
  app.useGlobalInterceptors(new TransformInterceptor());

  await app.listen(3001);
}
bootstrap();
