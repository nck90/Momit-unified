import { Controller, Post, Body, UseGuards, Request } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { ApiTags, ApiBearerAuth, ApiOperation, ApiResponse } from '@nestjs/swagger';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('register')
  @ApiOperation({ summary: '사용자 등록' })
  @ApiResponse({ status: 201, description: '사용자 등록 성공' })
  @ApiResponse({ status: 400, description: '잘못된 요청' })
  async register(@Body() registerDto: RegisterDto) {
    return this.authService.register(registerDto);
  }

  @Post('login')
  @ApiOperation({ summary: '사용자 로그인' })
  @ApiResponse({ status: 200, description: '로그인 성공' })
  @ApiResponse({ status: 401, description: '인증 실패' })
  async login(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto);
  }

  @UseGuards(JwtAuthGuard)
  @Post('profile')
  @ApiBearerAuth()
  @ApiOperation({ summary: '사용자 프로필 조회' })
  @ApiResponse({ status: 200, description: '프로필 조회 성공' })
  @ApiResponse({ status: 401, description: '인증 실패' })
  getProfile(@Request() req) {
    return req.user;
  }
}