// src/common/decorators/roles.decorator.ts

import { SetMetadata } from '@nestjs/common';

/**
 * Roles 데코레이터는 핸들러에 접근할 수 있는 사용자 역할을 정의합니다.
 * @param roles - 접근을 허용할 사용자 역할 목록
 */
export const ROLES_KEY = 'roles';
export const Roles = (...roles: string[]) => SetMetadata(ROLES_KEY, roles);