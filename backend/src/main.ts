import { HttpException, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

const ERROR_CODE_INVALID_BODY = 400;
require('dotenv').config();

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      exceptionFactory: (errors) => {
        const result = errors.map((error) => ({
          error_code: ERROR_CODE_INVALID_BODY,
          error_description:
            error.constraints[Object.keys(error.constraints)[0]],
        }));
        if (result.length === 1)
          return new HttpException(result[0], ERROR_CODE_INVALID_BODY);
      },
      stopAtFirstError: true,
    }),
  );
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
