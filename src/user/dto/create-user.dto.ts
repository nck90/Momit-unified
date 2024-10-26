import { IsEmail, IsOptional, IsEnum, IsString, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { UserRole } from '../entities/user.entity';

export class CreateUserDto {
  @ApiProperty({ description: '사용자의 이메일 주소' })
  @IsEmail()
  email: string;

  @ApiProperty({ description: '사용자의 비밀번호', minLength: 6 })
  @IsOptional()
  @IsString()
  @MinLength(6)
  password?: string; // 소셜 로그인 시 필요 없을 수 있음

  @ApiProperty({ description: '사용자의 이름' })
  @IsString()
  name: string;

  @ApiProperty({ description: '사용자의 아바타 URL', required: false })
  @IsOptional()
  @IsString()
  avatarUrl?: string;

  @ApiProperty({ description: '사용자 역할', enum: UserRole, required: false })
  @IsOptional()
  @IsEnum(UserRole)
  role?: UserRole;
}