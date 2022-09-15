import jwt from 'jsonwebtoken';
import { Either, failure, success } from '@core/domain/Either';

import { User } from '../aggregates/User';

export class TokenHelper {
  private get JWT_SECRET() {
    if (!process.env.JWT_SECRET) throw new TokenSecretError();
    return process.env.JWT_SECRET;
  }

  generateLoginToken = (user: User): string => {
    const content = { id: user.id.toValue() };
    return jwt.sign(content, this.JWT_SECRET);
  };

  validateLoginToken = (token: string): Either<LoginTokenContent, InvalidTokenFormatError> => {
    const payload = jwt.verify(token, this.JWT_SECRET, { ignoreExpiration: true });

    if (typeof payload !== 'object')
      return failure(new InvalidTokenFormatError('Token is not object'));

    if (typeof payload.id !== 'string') return failure(new InvalidTokenFormatError(payload));
    const id = payload.id;
    return success({ id });
  };
}

export interface LoginTokenContent {
  id: string;
}

export class TokenSecretError extends Error {
  constructor() {
    super('JWT secret não encontrado');
  }
}

export class InvalidTokenFormatError extends Error {
  constructor(public token: any) {
    super('Token com formato inválido');
  }
}
