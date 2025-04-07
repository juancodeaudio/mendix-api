import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { DatabaseExceptionInterceptor } from './common/interceptors/database-exception.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('Mendix Manufacturing API')
    .setDescription('API for managing manufacturing processes and integrate with Mendix')
    .setVersion('1.0')
    .addTag('mendix')
    .build();
  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, documentFactory);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      transformOptions: {
        enableImplicitConversion: true,
      },
      forbidNonWhitelisted: true,
      skipMissingProperties: false,
      validationError: { target: false, value: false },
    })
  );

  app.useGlobalInterceptors(new DatabaseExceptionInterceptor());

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
