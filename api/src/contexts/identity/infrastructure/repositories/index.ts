import { prismaClient } from '@shared/infrastructure/prisma/client';

import { UserRepositoryPrismaImpl } from './UserRepositoryPrismaImpl';

const userRepositoryImpl = new UserRepositoryPrismaImpl(prismaClient);

export { userRepositoryImpl };
