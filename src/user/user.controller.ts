import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../common/decorators/roles.decorator';
import { UserRole } from './entities/user.entity';
import { ApiTags, ApiBearerAuth, ApiOperation, ApiResponse } from '@nestjs/swagger';

@ApiTags('users')
@Controller('users')
@UseGuards(JwtAuthGuard, RolesGuard)
@ApiBearerAuth()
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  @Roles(UserRole.ORGANIZER)
  @ApiOperation({ summary: '사용자 생성' })
  @ApiResponse({ status: 201, description: '사용자 생성 성공' })
  @ApiResponse({ status: 400, description: '잘못된 요청' })
  async create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Get()
  @Roles(UserRole.ORGANIZER)
  @ApiOperation({ summary: '모든 사용자 조회' })
  @ApiResponse({ status: 200, description: '사용자 목록 반환' })
  async findAll() {
    return this.userService.findAll();
  }

  @Get(':email')
  @Roles(UserRole.ORGANIZER, UserRole.PARTICIPANT)
  @ApiOperation({ summary: '특정 사용자 조회' })
  @ApiResponse({ status: 200, description: '사용자 정보 반환' })
  @ApiResponse({ status: 404, description: '사용자 없음' })
  async findOne(@Param('email') email: string) {
    return this.userService.findByEmail(email);
  }

  @Patch(':email')
  @Roles(UserRole.ORGANIZER)
  @ApiOperation({ summary: '사용자 정보 업데이트' })
  @ApiResponse({ status: 200, description: '사용자 정보 업데이트 성공' })
  @ApiResponse({ status: 404, description: '사용자 없음' })
  async update(@Param('email') email: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(email, updateUserDto);
  }

  @Delete(':email')
  @Roles(UserRole.ORGANIZER)
  @ApiOperation({ summary: '사용자 삭제' })
  @ApiResponse({ status: 200, description: '사용자 삭제 성공' })
  @ApiResponse({ status: 404, description: '사용자 없음' })
  async remove(@Param('email') email: string) {
    return this.userService.remove(email);
  }
}