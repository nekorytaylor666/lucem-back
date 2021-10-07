import { SetMetadata } from '@nestjs/common';

export const Roles = (...roles: ('doctor' | 'admin' | 'user' | 'none')[]) => SetMetadata('roles', roles);
