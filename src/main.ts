import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { CustomExceptionFilter } from './http-exception/exception.filter';
import { CustomException } from './http-exception/custom-exception';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const logger = app.get(WINSTON_MODULE_NEST_PROVIDER);

  // whiteList -> 엔티티 데코레이터에 없는 프로퍼티 값은 무조건 거름
  // forbidNonWhitelisted -> 엔티티 데코레이터에 없는 값 인입시 그 값에 대한 에러메세지 알려줌
  // transform -> 컨트롤러가 값을 받을때 컨트롤러에 정의한 타입으로 형변환
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
      exceptionFactory: (error) => {
        const errorMessage = error
          .map((error) => Object.values(error.constraints))
          .join(', ');

        return new CustomException(
          'pipe',
          'Bad Request',
          `Type and validation errors : ${errorMessage}`,
          400,
        );
      },
    }),
  );
  app.useGlobalFilters(new CustomExceptionFilter(logger));

  await app.listen(process.env.PORT || 80);
}
bootstrap();
