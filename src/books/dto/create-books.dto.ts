import { IsEmail, IsNotEmpty, IsNumber, IsString, Matches } from 'class-validator';

export class CreateBookDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  @IsNumber()
  price: number;

}
