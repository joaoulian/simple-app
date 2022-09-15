import { MutationResolvers } from '@shared/infrastructure/resolvers-types';
import { updateUserUseCase } from '@identity/application/useCases';
import { UserActor } from '@identity/application/actors/User';

export const updateUserResolver: MutationResolvers['updateUser'] = async (
  _rootValue,
  { input: { birthdate, email, firstName, lastName } },
  context,
) => {
  const actor = context.userContext?.user.id
    ? new UserActor({}, context.userContext.user.id)
    : undefined;

  const response = await updateUserUseCase.execute(
    {
      ...(birthdate && { birthdate: new Date(birthdate) }),
      ...(email && { email }),
      ...(firstName && { firstName }),
      ...(lastName && { lastName }),
    },
    actor,
  );

  response.run();

  return { success: true };
};
