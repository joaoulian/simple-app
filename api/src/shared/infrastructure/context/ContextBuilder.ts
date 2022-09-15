import { Request, Response } from 'express';
import { AuthenticationError } from 'apollo-server';
import { User } from '@identity/domain/aggregates/User';
import { tokenHelper } from '@identity/domain/services';
import { UserRepository } from '@identity/domain/repositories/UserRepository';
import { UserID } from '@identity/domain/aggregates/UserID';

export class ContextBuilder {
  private tokenHelper = tokenHelper;

  constructor(private userRepository: UserRepository) {}

  build = async (req: Request, res: Response): Promise<Context | undefined> => {
    const token = this.getToken(req.headers.authorization);
    if (!token) return undefined;

    const user = await this.getUserFromToken(token);
    if (!user) return undefined;

    return new Context(user);
  };

  private getToken = (authorization?: string): string | null => {
    const bearerLength = 'Bearer '.length;
    if (!authorization || authorization.length < bearerLength) return null;
    return authorization.slice(bearerLength);
  };

  private getUserFromToken = async (token: string): Promise<User | undefined> => {
    const tokenContentOrError = this.tokenHelper.validateLoginToken(token);
    if (tokenContentOrError.isFailure()) {
      const error = tokenContentOrError.getError();
      throw new AuthenticationError(error.message);
    }
    const tokenContent = tokenContentOrError.run();
    const user = await this.userRepository.getById(new UserID(tokenContent.id));
    if (!user) return undefined;
    return user;
  };
}

export class Context {
  constructor(public user: User) {}
}
