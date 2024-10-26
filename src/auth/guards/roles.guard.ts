// src/auth/guards/roles.guard.ts

import { Injectable, CanActivate, ExecutionContext, ForbiddenException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ROLES_KEY } from '../../common/decorators/roles.decorator';
import { User } from '../../user/entities/user.entity';

/**
 * RolesGuard는 요청을 처리하기 전에 사용자의 역할을 확인하여 접근 권한을 제어합니다.
 */
@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    // 핸들러 메서드에서 요구하는 역할을 가져옵니다.
    const requiredRoles = this.reflector.getAllAndOverride<string[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    // 요구하는 역할이 없으면 접근을 허용합니다.
    if (!requiredRoles) {
      return true;
    }

    // 요청 객체에서 사용자 정보를 가져옵니다.
    const { user } = context.switchToHttp().getRequest();

    // 사용자가 없거나 역할이 없으면 접근을 거부합니다.
    if (!user || !user.role) {
      throw new ForbiddenException('접근 권한이 없습니다.');
    }

    // 사용자의 역할이 요구된 역할 중 하나와 일치하는지 확인합니다.
    if (!requiredRoles.includes(user.role)) {
      throw new ForbiddenException('접근 권한이 없습니다.');
    }

    return true;
  }
}