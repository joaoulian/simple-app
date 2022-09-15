import { loginResolver } from '@identity/infrastructure/graphql/mutations/loginResolver';
import { signUpResolver } from '@identity/infrastructure/graphql/mutations/signUpResolver';
import { updateUserResolver } from '@identity/infrastructure/graphql/mutations/updateUserResolver';
import { meResolver } from '@identity/infrastructure/graphql/queries/meResolver';

export const resolvers = {
  Mutation: {
    signUp: signUpResolver,
    login: loginResolver,
    updateUser: updateUserResolver,
  },
  Query: {
    me: meResolver,
  },
};
