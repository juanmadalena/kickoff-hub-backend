import 'dotenv/config';
import { get } from 'env-var';


export const envs = {

  PORT: get('PORT').required().asPortNumber(),

  DB_HOST: get('DB_HOST').required().asString(),

  DB_PORT: get('DB_PORT').required().asPortNumber(),

  DB_USER: get('DB_USER').required().asString(),

  DB_PASSWORD: get('DB_PASSWORD').required().asString(),

  DB_DATABASE: get('DB_DATABASE').required().asString(),

  DB_MAX_CONNECTIONS: get('DB_MAX_CONNECTIONS').required().asIntPositive(),

  DB_IDLE_TIMEOUT: get('DB_IDLE_TIMEOUT').required().asIntPositive(),

  DB_CONNECTION_TIMEOUT: get('DB_CONNECTION_TIMEOUT').required().asIntPositive(),

  JWT_SECRET: get('JWT_SECRET').required().asString(),

}