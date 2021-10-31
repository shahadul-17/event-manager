import { IEventArguments } from './event-arguments.i';
import { EventListener } from './event-listener.t';

export interface IEventManager<EventType extends string = string,
  ArgumentsType extends IEventArguments<EventType>
  = IEventArguments<EventType>> {

  /**
   * Adds the specified event listener.
   * @param type Type of event listener to add.
   * @param listener The event listener to add.
   * @returns Returns true if event listener is successfully
   * added. Otherwise returns false.
   */
  addEventListener(type: EventType, listener: EventListener<EventType, ArgumentsType>): boolean;

  /**
   * Removes the specified event listener.
   * @param listener The event listener to remove.
   * @param type (Optional) Type of event listener to remove.
   * If type is not specified, it will search the entire collection of event listeners.
   * @param removeAll (Optional) Removes all the listeners that matches the specified listener.
   * @returns Returns true if event listener is successfully
   * removed. Otherwise returns false.
   */
  removeEventListener(listener: EventListener<EventType, ArgumentsType>, type?: EventType, removeAll?: boolean): boolean;

  /**
   * Removes event listeners of the specified type. If type
   * is not provided, removes all event listeners.
   * @param type (Optional) Type of event listeners to remove.
   */
  removeEventListeners(type?: EventType): void;

  /**
   * Copies event listeners from one event manager to another.
   * @param eventManager Event manager from which the listeners should be copied.
   * @param type (Optional) Type of the event listeners that should be copied.
   * @returns Returns false if any of the event listeners failed to be copied.
   * Otherwise returns true.
   */
  copyEventListeners(eventManager: IEventManager<EventType, ArgumentsType>, type?: EventType): boolean;
}
