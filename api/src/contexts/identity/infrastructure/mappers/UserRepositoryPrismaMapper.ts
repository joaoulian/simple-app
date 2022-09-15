import { Birthdate } from '@identity/domain/aggregates/Birthdate';
import { Email } from '@identity/domain/aggregates/Email';
import { Name } from '@identity/domain/aggregates/Name';
import { Password } from '@identity/domain/aggregates/Password';
import { User } from '@identity/domain/aggregates/User';
import { UserID } from '@identity/domain/aggregates/UserID';
import { Prisma, User as PrismaUser } from '@prisma/client';

export class UserRepositoryPrismaMapper {
  static toDomain(user: PrismaUser): User {
    const id = new UserID(user.id);
    const birthdate = Birthdate.create(user.birthdate);
    const email = Email.create(user.email);
    const firstName = Name.create(user.firstName);
    const lastName = Name.create(user.lastName);
    const password = Password.create({ value: user.password, hashed: true });

    return User.create(
      {
        birthdate,
        email,
        firstName,
        lastName,
        password,
      },
      id,
    );
  }

  static async toPersistance(user: User): Promise<Prisma.UserCreateInput> {
    return {
      birthdate: user.props.birthdate.value,
      firstName: user.props.firstName.value,
      lastName: user.props.lastName.value,
      email: user.props.email.value,
      password: await user.props.password.getHashedValue(),
      id: user.id.toValue(),
    };
  }
}
