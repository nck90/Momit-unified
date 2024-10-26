// src/auth/google.strategy.ts
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, VerifyCallback } from 'passport-google-oauth20';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AuthService } from '../auth.service';
import { UserService } from '../../user/user.service';
import { UserRole } from '../../user/entities/user.entity';

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
  constructor(
    configService: ConfigService,
    private authService: AuthService,
    private userService: UserService,
  ) {
    super({
      clientID: configService.get<string>('GOOGLE_CLIENT_ID'),
      clientSecret: configService.get<string>('GOOGLE_CLIENT_SECRET'),
      callbackURL: '/auth/google/callback',
      scope: ['email', 'profile'],
    });
  }

  async validate(
    accessToken: string,
    refreshToken: string,
    profile: any,
    done: VerifyCallback,
  ): Promise<any> {
    const { emails, displayName, photos } = profile;
    const email = emails[0].value;
    const user = await this.userService.findByEmail(email);
    if (!user) {
      // 새로운 사용자 생성
      const newUser = await this.userService.create({
        email,
        name: displayName,
        avatarUrl: photos[0].value,
        role: UserRole.PARTICIPANT,
        password: '', // 소셜 로그인은 비밀번호가 필요 없을 수 있음
      });
      done(null, newUser);
    } else {
      done(null, user);
    }
  }
}