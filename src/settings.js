import dotenv from 'dotenv';

dotenv.config();

export const welcomeVariable = process.env.WELCOME_VARIABLE;
export const testEnvironmentVariable = process.env.TEST_ENV_VARIABLE;
export const connectionString = process.env.CONNECTION_STRING;
export const jwtSecretToken = process.env.JWT_SECRET_TOKEN;
