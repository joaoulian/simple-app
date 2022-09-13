import { Actor } from './Actor';

export interface UseCase<IRequest, IResponse> {
  execute: (request: IRequest, actor?: Actor<any>) => Promise<IResponse | any>;
}
