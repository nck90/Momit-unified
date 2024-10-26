import { IsEmail, IsNotEmpty } from 'class-validator';

export class InviteParticipantDto {
  @IsNotEmpty()
  @IsEmail()
  email: string;
}