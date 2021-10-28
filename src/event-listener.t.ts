import { IEventArguments } from './event-arguments.i';

export type EventListener = (eventArguments: IEventArguments) => void;
