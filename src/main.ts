import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {

  const app = await NestFactory.create(AppModule);
  app.enableCors();

  app.setGlobalPrefix('/v1/api');

  const options = new DocumentBuilder()
    .setTitle('Orders REST API')
    .setDescription(
      'Backend for the consumption of service orders in Aquasistemas',
    )
    .setVersion('1.0')
    .setContact('Real-Software-Solutions', 'real-software.com', 'support@realsoft.com')
    .build();

  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('/v1/api', app, document);

  await app.listen(AppModule.port);

}
bootstrap();
