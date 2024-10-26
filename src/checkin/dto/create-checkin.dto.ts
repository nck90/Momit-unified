import { IsUUID, IsNotEmpty } from 'class-validator';

export class CreateCheckInDto {
  @IsUUID()
  @IsNotEmpty()
  eventId: string;

  @IsUUID()
  @IsNotEmpty()
  userId: string;
}