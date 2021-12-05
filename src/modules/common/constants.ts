import * as dotenv from 'dotenv';

dotenv.config();

export const passwordSalt = process.env.SALT || 10;
export const tokenExpiration = Number(process.env.TOKEN_EXPIRATION) || 3600;
export const PORT = Number(process.env.PORT) || 3000;
export const HOST = process.env.HOST || '0.0.0.0';
