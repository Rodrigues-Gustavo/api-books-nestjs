import { Injectable } from "@nestjs/common";
import { Books } from "@prisma/client";
import { randomUUID } from "node:crypto";
import { PrismaService } from "src/database/prisma.service";
import { IBooksRepository } from "src/repository/IBooksRepository";

@Injectable()
export class BookRepositoryImpl implements IBooksRepository {
  constructor(private prisma: PrismaService) {}

  async create(name: string, description: string): Promise<void> {
    await this.prisma.books.create({
      data: {
        id: randomUUID(),
        name,
        description,
      },
    });
  }

  async getAll(): Promise<Books[]> {
    return await this.prisma.books.findMany();
  }

  async getById(id: string): Promise<Books> {
    return await this.prisma.books.findUnique({ where: { id } });
  }

  async update(id: string, name: string, description: string): Promise<void> {
    await this.prisma.books.update({
      where: { id },
      data: { name, description },
    });
  }

  async delete(id: string): Promise<void> {
    await this.prisma.books.delete({ where: { id } });
  }
}