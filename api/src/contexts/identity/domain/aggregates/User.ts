import { AggregateRoot } from '@core/domain/AggregateRoot';

import { Birthdate } from './Birthdate';
import { Email } from './Email';
import { Name } from './Name';
import { Password } from './Password';
import { UserID } from './UserID';

export interface UserProps {
  firstName: Name;
  lastName: Name;
  birthdate: Birthdate;
  email: Email;
  password: Password;
}

export class User extends AggregateRoot<UserProps, UserID> {
  private constructor(props: UserProps, id: UserID) {
    super(props, id);
  }

  static create(props: UserProps, id?: UserID): User {
    return new User(props, id ?? new UserID());
  }
}