import { IEventArguments } from './event-arguments.i';

export type EventListener<EventType extends string = string,
  ArgumentsType extends IEventArguments<EventType> = IEventArguments<EventType>>
  = (eventArguments: ArgumentsType) => void;
