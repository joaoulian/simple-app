import { MutationResolvers } from '@shared/infrastructure/resolvers-types';
import { loginUseCase } from '@identity/application/useCases';

export const loginResolver: MutationResolvers['login'] = async (
  _rootValue,
  { input: { email, password } },
  context,
) => {
  const response = await loginUseCase.execute({
    email,
    password,
  });

  return response.run();
};
