import { UseCase } from '@core/application/UseCase';
import { Either, failure, success } from '@core/domain/Either';
import { tokenHelper } from '@identity/domain/services';

import { Email } from '../../domain/aggregates/Email';
import { UserRepository } from '../../domain/repositories/UserRepository';

interface IRequest {
  email: string;
  password: string;
}

interface IResponse {
  accessToken: string;
}

export class LoginUseCase implements UseCase<IRequest, IResponse> {
  private tokenHelper = tokenHelper;
  constructor(private userRepository: UserRepository) {}

  async execute(request: IRequest): Promise<Either<IResponse, SignUpValidationError>> {
    try {
      const email = Email.create(request.email);

      const user = await this.userRepository.getByEmail(email);
      if (!user) throw new Error();

      const isValidPassword = user.password.comparePassword(request.password);
      if (!isValidPassword) throw new Error();

      const accessToken = this.tokenHelper.generateLoginToken(user);

      return success({ accessToken });
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
