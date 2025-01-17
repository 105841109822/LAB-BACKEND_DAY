import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
import * as cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.use(cookieParser())

  app.enableCors({ //mengakses  ip address, jika menggunakan * maka semua ip address bisa mengakses aplikasi
    origin : "*"
  })

  app.useGlobalPipes( // menerapkan validata dari file dto ke dalam aplikasi
    new ValidationPipe({
      transform : true
    }))

  const config = new DocumentBuilder()
    .setTitle('Lab Backend Kelas C dan D ')
    .setDescription('Lab Backend')
    .setVersion('0.1')
    .addTag('kelas-C')
    .addBearerAuth()
    .build();
    
  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api-docs', app, documentFactory);

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();