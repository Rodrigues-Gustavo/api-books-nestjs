import { Books } from "@prisma/client";

export abstract class IBooksRepository {
  abstract create(name: string, description: string): Promise<void>;
  abstract getAll(): Promise<Books[]>;
  abstract getById(id: string): Promise<Books>;
  abstract update(id: string, name: string, description: string): Promise<void>;
  abstract delete(id: string): Promise<void>;
}