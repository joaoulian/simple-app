import { Email } from '../aggregates/Email';
import { User } from '../aggregates/User';
import { UserID } from '../aggregates/UserID';

export interface UserRepository {
  save(user: User): Promise<void>;
  getById(userId: UserID): Promise<User | null>;
  getByEmail(email: Email): Promise<User | null>;
}
