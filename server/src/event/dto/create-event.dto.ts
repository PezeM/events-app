import {
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsPositive,
  IsString,
  Length,
} from 'class-validator';

export class CreateEventDto {
  @IsString()
  @IsNotEmpty()
  @Length(3, 30)
  firstName: string;

  @IsString()
  @IsNotEmpty()
  @Length(3, 30)
  lastName: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsNumber()
  @IsPositive()
  eventDate: number;
}
