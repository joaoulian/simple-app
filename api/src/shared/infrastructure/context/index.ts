import { userRepositoryImpl } from '@identity/infrastructure/repositories';

import { ContextBuilder } from './ContextBuilder';

const contextBuilder = new ContextBuilder(userRepositoryImpl);

export { contextBuilder };
