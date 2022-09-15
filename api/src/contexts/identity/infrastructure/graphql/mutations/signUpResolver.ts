import { MutationResolvers } from '@shared/infrastructure/resolvers-types';
import { signUpUseCase } from '@identity/application/useCases';

export const signUpResolver: MutationResolvers['signUp'] = async (
  _rootValue,
  { input: { birthdate, email, firstName, lastName, password } },
  context,
) => {
  const response = await signUpUseCase.execute({
    birthdate: new Date(birthdate),
    email,
    firstName,
    lastName,
    password,
  });

  return response.run();
};
