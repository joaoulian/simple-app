import { userRepositoryImpl } from '@identity/infrastructure/repositories';

import { SignUpUseCase } from './SignUp';
import { LoginUseCase } from './Login';
import { UpdateUserUseCase } from './UpdateUser';

const signUpUseCase = new SignUpUseCase(userRepositoryImpl);
const loginUseCase = new LoginUseCase(userRepositoryImpl);
const updateUserUseCase = new UpdateUserUseCase(userRepositoryImpl);

export { signUpUseCase, loginUseCase, updateUserUseCase };
