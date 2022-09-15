import { loginResolver } from '@identity/infrastructure/graphql/mutations/loginResolver';
import { signUpResolver } from '@identity/infrastructure/graphql/mutations/signUpResolver';
import { meResolver } from '@identity/infrastructure/graphql/queries/meResolver';

export const resolvers = {
  Mutation: {
    signUp: signUpResolver,
    login: loginResolver,
  },
  Query: {
    me: meResolver,
  },
};
