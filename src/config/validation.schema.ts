import * as joi from '@hapi/joi';

export const validationSchema = joi.object({
  // env
  PORT: joi.number().required(),

  // logger
  NODE_ENV: joi.string().required(),
  APP_NAME: joi.string().required(),
  LOG_DIR: joi.string().required(),

  // jwt
  JWT_SECRET: joi.string().required(),
  JWT_EXPIRES: joi.string().required(),
  ACCESS_EXPIRES: joi.string().required(),
  REFRESH_EXPIRES: joi.string().required(),

  // DB
  DB_HOST: joi.string().required(),
  DB_PORT: joi.number().required(),
  DB_USERNAME: joi.string().required(),
  DB_PASSWORD: joi.string().required(),
  DB_DATABASE: joi.string().required(),
});
