import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-facebook'; // VerifyCallback 제거
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { UserService } from '../../user/user.service';
import { UserRole } from '../../user/entities/user.entity';

@Injectable()
export class FacebookStrategy extends PassportStrategy(Strategy, 'facebook') {
  constructor(
    configService: ConfigService,
    private userService: UserService,
  ) {
    super({
      clientID: configService.get<string>('FACEBOOK_CLIENT_ID'),
      clientSecret: configService.get<string>('FACEBOOK_CLIENT_SECRET'),
      callbackURL: '/auth/facebook/callback',
      profileFields: ['emails', 'name', 'displayName', 'photos'],
    });
  }

  async validate(
    accessToken: string,
    refreshToken: string,
    profile: any,
    done: Function, // VerifyCallback 대신 Function 사용
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
        role: UserRole.PARTICIPANT, // UserRole Enum 사용
        password: '', // 소셜 로그인은 비밀번호가 필요 없을 수 있음
      });
      done(null, newUser);
    } else {
      done(null, user);
    }
  }
}