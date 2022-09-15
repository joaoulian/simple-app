import { Actor } from '@core/application/Actor';
import { UserID } from '@identity/domain/aggregates/UserID';

interface UserActorProps {}

export class UserActor extends Actor<UserID, UserActorProps> {}
