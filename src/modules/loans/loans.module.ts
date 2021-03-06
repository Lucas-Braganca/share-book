import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from '../auth/auth.module';
import { BooksModule } from '../books/books.module';
import { LoansController } from './loans.controller';
import { Loan } from './loans.entity';
import { LoansService } from './loans.service';

@Module({
  imports: [AuthModule, BooksModule, TypeOrmModule.forFeature([Loan])],
  controllers: [LoansController],
  providers: [LoansService],
  exports: [LoansService],
})
export class LoansModule {}
