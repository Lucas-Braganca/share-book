import * as dotenv from 'dotenv';

dotenv.config();

export const passwordSalt = process.env.SALT || 10;
export const tokenExpiration = Number(process.env.TOKEN_EXPIRATION) || 3600;
