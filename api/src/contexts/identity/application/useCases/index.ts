import { userRepositoryImpl } from '@identity/infrastructure/repositories';

import { SignUpUseCase } from './SignUp';
import { LoginUseCase } from './Login';

const signUpUseCase = new SignUpUseCase(userRepositoryImpl);
const loginUseCase = new LoginUseCase(userRepositoryImpl);

export { signUpUseCase, loginUseCase };
