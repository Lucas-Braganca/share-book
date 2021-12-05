import { DocumentBuilder } from '@nestjs/swagger';
import * as dotenv from 'dotenv';
import { PORT } from './modules/common/constants';

dotenv.config();
export const options = new DocumentBuilder()
  .setTitle('Campaigns')
  .setDescription('Campaigns')
  .setVersion('1.0')
  .addTag('Campaigns')
  .addBearerAuth({ type: 'http', scheme: 'bearer', bearerFormat: 'JWT' })
  .addServer(`http://localhost:${PORT}`)
  .build();
