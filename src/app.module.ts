import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { PrismaService } from './database/prisma.service';
import { BookRepositoryImpl } from './repository/prisma/BooksRepositoeyImpl';
import { IBooksRepository } from './repository/IBooksRepository';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [
    PrismaService,
    {
      provide: IBooksRepository,
      useClass: BookRepositoryImpl,
    },
  ],
})
export class AppModule {}
