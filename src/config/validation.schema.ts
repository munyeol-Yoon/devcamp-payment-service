import * as joi from '@hapi/joi';

export const validationSchema = joi.object({
  // env
  PORT: joi.number().required(),

  // DB
  DB_HOST: joi.string().required(),
  DB_PORT: joi.number().required(),
  DB_USERNAME: joi.string().required(),
  DB_PASSWORD: joi.string().required(),
  DB_DATABASE: joi.string().required(),
});
