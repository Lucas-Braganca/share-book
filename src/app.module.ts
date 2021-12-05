import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './modules/auth/auth.module';
import { BooksModule } from './modules/books/books.module';
import { LoansModule } from './modules/loans/loans.module';
import { UsersModule } from './modules/users/users.module';
import * as config from './ormconfig';
@Module({
  imports: [
    TypeOrmModule.forRoot(config),
    UsersModule,
    BooksModule,
    LoansModule,
    AuthModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
