import { PrismaClient, User as PrismaUser } from '@prisma/client';
import { User } from '@identity/domain/aggregates/User';
import { UserID } from '@identity/domain/aggregates/UserID';
import { UserRepository } from '@identity/domain/repositories/UserRepository';
import { Email } from '@identity/domain/aggregates/Email';

import { UserRepositoryPrismaMapper } from '../mappers/UserRepositoryPrismaMapper';

export class UserRepositoryPrismaImpl implements UserRepository {
  constructor(private readonly prisma: PrismaClient) {}

  async save(user: User): Promise<void> {
    const persistance = await UserRepositoryPrismaMapper.toPersistance(user);
    await this.prisma.user.upsert({
      where: {
        id: user.id.toString(),
      },
      update: {
        ...persistance,
        id: undefined,
      },
      create: {
        ...persistance,
      },
    });
  }

  async getById(userId: UserID): Promise<User | null> {
    const dbData = await this.prisma.user.findUnique({
      where: {
        id: userId.toValue(),
      },
    });

    if (dbData) return this.convertPersistanceDataToDomain(dbData);
    return null;
  }

  async getByEmail(email: Email): Promise<User | null> {
    const dbData = await this.prisma.user.findUnique({
      where: {
        email: email.value,
      },
    });

    if (dbData) return this.convertPersistanceDataToDomain(dbData);
    return null;
  }

  private convertPersistanceDataToDomain(db: PrismaUser): User {
    return UserRepositoryPrismaMapper.toDomain(db);
  }
}
