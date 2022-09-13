import { UseCase } from '@core/application/UseCase';
import { Either, failure, success } from '@core/domain/Either';

import { Birthdate } from '../../domain/aggregates/Birthdate';
import { Email } from '../../domain/aggregates/Email';
import { Name } from '../../domain/aggregates/Name';
import { Password } from '../../domain/aggregates/Password';
import { User } from '../../domain/aggregates/User';
import { UserRepository } from '../../domain/repositories/UserRepository';

interface IRequest {
  firstName: string;
  lastName: string;
  birthdate: Date;
  email: string;
  password: string;
}

interface IResponse {
  id: string;
}

export class SignUpUseCase implements UseCase<IRequest, IResponse> {
  constructor(private userRepository: UserRepository) {}

  async execute(request: IRequest): Promise<Either<IResponse, SignUpValidationError>> {
    try {
      const firstName = Name.create(request.firstName);
      const lastName = Name.create(request.lastName);
      const birthdate = Birthdate.create(request.birthdate);
      const email = Email.create(request.email);
      const password = await Password.create({ value: request.password });

      const user = User.create({
        firstName,
        birthdate,
        email,
        lastName,
        password,
      });

      await this.userRepository.save(user);

      return success({ id: user.id.toValue() });
    } catch (error) {
      return failure(new SignUpValidationError((error as any).message));
    }
  }
}

export class SignUpValidationError extends Error {
  constructor(message: string) {
    super(message);
  }
}
