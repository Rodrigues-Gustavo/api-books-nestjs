import { IsNotEmpty, Length } from "class-validator";

export class CreateBookDTO {
  @IsNotEmpty({
    message: 'the name of the book cannot be empty.'
  })
  @Length(1, 100)
  name: string;

  @IsNotEmpty({
    message: 'the book description cannot be empty.'
  })
  @Length(1, 100)
  description: string;
}