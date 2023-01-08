import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  console.log(
    '**********************************\n \n the server is runing \n \n **********************************',
  );
  const app = await NestFactory.create(AppModule, { abortOnError: false });
  await app.listen(3000);
}
bootstrap();
