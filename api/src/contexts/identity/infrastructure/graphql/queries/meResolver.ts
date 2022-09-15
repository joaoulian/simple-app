import { QueryResolvers } from '@shared/infrastructure/resolvers-types';
import { AuthenticationError } from 'apollo-server';

export const meResolver: QueryResolvers['me'] = async (_rootValue, _args, context) => {
  if (!context.userContext) throw new AuthenticationError('Usuário precisa estar autenticado');

  const user = context.userContext.user;

  return {
    id: user.id.toValue(),
    birthdate: user.birthdate.value.toISOString(),
    email: user.email.value,
    firstName: user.firstName.value,
    lastName: user.lastName.value,
  };
};
