import { UseCase } from '@core/application/UseCase';
import { Either, failure, success } from '@core/domain/Either';
import { UserID } from '@identity/domain/aggregates/UserID';

import { Birthdate } from '../../domain/aggregates/Birthdate';
import { Email } from '../../domain/aggregates/Email';
import { Name } from '../../domain/aggregates/Name';
import { UserRepository } from '../../domain/repositories/UserRepository';
import { UserActor } from '../actors/User';

interface IRequest {
  firstName?: string;
  lastName?: string;
  birthdate?: Date;
  email?: string;
}

interface IResponse {}

export class UpdateUserUseCase implements UseCase<IRequest, IResponse> {
  constructor(private userRepository: UserRepository) {}

  async execute(
    request: IRequest,
    actor?: UserActor,
  ): Promise<Either<IResponse, UserNotFound | UpdateUserValidationError>> {
    if (!actor) throw new ForbiddenError();

    const userId = new UserID(actor.id.toValue());

    const user = await this.userRepository.getById(userId);
    if (!user) return failure(new UserNotFound(userId.toValue()));

    try {
      if (request.firstName) {
        const firstName = Name.create(request.firstName);
        user.firstName = firstName;
      }

      if (request.lastName) {
        const lastName = Name.create(request.lastName);
        user.lastName = lastName;
      }

      if (request.birthdate) {
        const birthdate = Birthdate.create(request.birthdate);
        user.birthdate = birthdate;
      }

      if (request.email) {
        const email = Email.create(request.email);
        user.email = email;
      }

      await this.userRepository.save(user);

      return success({});
    } catch (error) {
      return failure(new UpdateUserValidationError((error as any).message));
    }
  }
}

export class UpdateUserValidationError extends Error {
  constructor(message: string) {
    super(message);
  }
}

export class UserNotFound extends Error {
  constructor(public userId: string) {
    super('Usuário não encontrado');
  }
}

export class ForbiddenError extends Error {
  constructor() {
    super('Usuário precisa estar autenticado');
  }
}
