import { PrismaClient } from '@prisma/client';

import { User } from '../domain/aggregates/User';
import { UserID } from '../domain/aggregates/UserID';
import { UserRepository } from '../domain/repositories/UserRepository';

export class UserRepositoryPrismaImpl implements UserRepository {
  constructor(private readonly prisma: PrismaClient) {}

  async save(user: User): Promise<void> {
    await this.prisma.user.upsert({
      where: {
        id: user.id.toString(),
      },
      update: {
        birthdate: user.props.birthdate.value,
        email: user.props.email.value,
        firstName: user.props.email.value,
        lastName: user.props.email.value,
        password: user.props.password.props.value,
      },
      create: {
        id: user.id.toValue(),
        birthdate: user.props.birthdate.value,
        email: user.props.email.value,
        firstName: user.props.email.value,
        lastName: user.props.email.value,
        password: user.props.password.props.value,
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
}
