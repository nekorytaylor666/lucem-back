import { SetMetadata } from '@nestjs/common';

export const Roles = (
    ...roles: ('doctor' | 'admin' | 'user' | 'secretary' | 'none')[]
) => SetMetadata('roles', roles);
