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
        const result = errors.map((error) => {
          if (!error.constraints) {
            if (error.children) {
              return {
                error_code: ERROR_CODE_INVALID_BODY,
                error_description:
                  error.children[0].constraints[
                    Object.keys(error.children[0].constraints)[0]
                  ],
              };
            }
          }
          return {
            error_code: ERROR_CODE_INVALID_BODY,
            error_description:
              error.constraints[Object.keys(error.constraints)[0]],
          };
        });
        return new HttpException(result[0], ERROR_CODE_INVALID_BODY);
      },
      stopAtFirstError: true,
    }),
  );
  app.enableCors();
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
