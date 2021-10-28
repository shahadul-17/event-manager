import { EventListener } from './event-listener.t';

export interface IEventManager {
  addEventListener(type: string, listener: EventListener): boolean;
  removeEventListener(type: string, listener: EventListener): boolean;
}
