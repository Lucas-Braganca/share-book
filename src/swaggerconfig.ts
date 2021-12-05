import { DocumentBuilder } from '@nestjs/swagger';
import * as dotenv from 'dotenv';
import { PORT } from './modules/common/constants';

dotenv.config();
export const options = new DocumentBuilder()
  .setTitle('Share Book')
  .setDescription(
    `Api para compartilhar livros entre pessoas. O usuário poderá listar seus livros para empréstimos, buscar livros nos quais tenha interesse e solicitar o empréstimo deles.
    Rotas para consulta de livros são liberadas, mas para realizar as demais operações como solicitar empréstimo e busca de usuários é necessário o login no sistema.`,
  )
  .setVersion('1.0')
  .addTag('ShareBook')
  .addBearerAuth({ type: 'http', scheme: 'bearer', bearerFormat: 'JWT' })
  .addServer(`http://localhost:${PORT}`)
  .build();
