import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './modules/users/users.module';
import { BooksModule } from './modules/books/books.module';
import { LoansModule } from './modules/loans/loans.module';
import * as config from './ormconfig';
@Module({
  imports: [TypeOrmModule.forRoot(config), UsersModule, BooksModule, LoansModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
