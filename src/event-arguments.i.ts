export interface IEventArguments<EventType extends string = string>
    extends Record<string, any>  {
  type: EventType;
}
