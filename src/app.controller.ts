import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { CreateBookDTO } from './dto/createBookDto';
import { IBooksRepository } from './repository/IBooksRepository';
import { Books } from '@prisma/client';
import { UpdateBookDTO } from './dto/updateBookDto';


@Controller('router')
export class AppController {
  constructor(private iBooksRepository: IBooksRepository) {}

  @Post('book')
  async createBook(@Body() body: CreateBookDTO) {
    const { name, description } = body;
    await this.iBooksRepository.create(name, description);
  }

  @Get('/book')
  async getAllBooks(): Promise<Books[]> {
    return await this.iBooksRepository.getAll();
  }

  @Get('/book/:id')
  async getBookById(@Param('id') id: string): Promise<Books> {
    return await this.iBooksRepository.getById(id);
  }

  @Put('/book/:id')
  async updateBook(@Param('id') id: string, @Body() body: UpdateBookDTO) {
    const { name, description } = body;
    await this.iBooksRepository.update(id, name, description);
  }

  @Delete('/book/:id')
  async deleteBook(@Param('id') id: string) {
    await this.iBooksRepository.delete(id);
  }
}