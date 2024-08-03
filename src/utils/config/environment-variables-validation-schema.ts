import * as Joi from 'joi';

export const environmentVariablesValidationSchema = Joi.object({
  ENV: Joi.string(),
  PORT: Joi.number(),
  DB_HOST: Joi.string(),
  DB_PORT: Joi.number(),
  DB_NAME: Joi.string(),
  DB_USERNAME: Joi.string(),
  DB_PASSWORD: Joi.string(),
  JWT_SECRET: Joi.string(),
});
