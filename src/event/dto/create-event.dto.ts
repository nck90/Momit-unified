import { IsNotEmpty, IsString, IsDate } from 'class-validator';

export class CreateEventDto {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsString()
  description?: string;

  @IsNotEmpty()
  @IsDate()
  date: Date;

  @IsString()
  location?: string;
}