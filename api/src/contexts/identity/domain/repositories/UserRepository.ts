import { Repository } from '@core/domain/Repository';

import { User } from '../aggregates/User';
import { UserID } from '../aggregates/UserID';

export interface UserRepository {
  save(user: User): Promise<void>;
  getById(userId: UserID): Promise<User | null>;
}
