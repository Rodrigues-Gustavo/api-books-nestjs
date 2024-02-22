import { 
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Post,
  Put
} from '@nestjs/common';
import { CreateBookDTO } from './dto/createBookDto';
import { IBooksRepository } from './repository/IBooksRepository';
import { Books } from '@prisma/client';
import { UpdateBookDTO } from './dto/updateBookDto';
import { isValidUUID } from './repository/utils/uuidUtils';


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
    const book = await this.iBooksRepository.getAll();
    if (!book) {
      throw new NotFoundException('Book not found');
    }
    return book;
  }

  @Get('/book/:id')
  async getBookById(@Param('id') id: string): Promise<Books> {
    return await this.iBooksRepository.getById(id);
  }

  @Put('/book/:id')
  async updateBook(@Param('id') id: string, @Body() body: UpdateBookDTO) {
    const { name, description } = body;

    if (!isValidUUID(id)) {
      throw new BadRequestException('Invalid book ID');
    }

    const existingBook = await this.iBooksRepository.getById(id);
    if (!existingBook) {
      throw new NotFoundException('Book not found');
    }

    await this.iBooksRepository.update(id, name, description);
  }

  @Delete('/book/:id')
  async deleteBook(@Param('id') id: string) {
    try {
      await this.iBooksRepository.delete(id);
      return 'Book deleted successfully';
    } catch (error) {
      throw new NotFoundException('Book not found');
    }
  }
}