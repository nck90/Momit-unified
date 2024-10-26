import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';
import { IsOptional, IsString, IsEnum, IsEmail, MinLength } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { UserRole } from '../entities/user.entity';

export class UpdateUserDto extends PartialType(CreateUserDto) {
  @ApiPropertyOptional({ description: '사용자의 이메일 주소' })
  @IsOptional()
  @IsEmail()
  email?: string;

  @ApiPropertyOptional({ description: '사용자의 비밀번호', minLength: 6 })
  @IsOptional()
  @IsString()
  @MinLength(6)
  password?: string;

  @ApiPropertyOptional({ description: '사용자의 이름' })
  @IsOptional()
  @IsString()
  name?: string;

  @ApiPropertyOptional({ description: '사용자의 아바타 URL' })
  @IsOptional()
  @IsString()
  avatarUrl?: string;

  @ApiPropertyOptional({ description: '사용자 역할', enum: UserRole })
  @IsOptional()
  @IsEnum(UserRole)
  role?: UserRole;
}