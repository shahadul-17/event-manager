import { EventListener } from './event-listener.t';

export interface IEventManager {

  /**
   * Adds the specified event listener.
   * @param type Type of event listener to add.
   * @param listener The event listener to add.
   * @returns Returns true if event listener is successfully
   * added. Otherwise returns false.
   */
  addEventListener(type: string, listener: EventListener): boolean;

  /**
   * Removes the specified event listener.
   * @param listener The event listener to remove.
   * @param type (Optional) Type of event listener to remove.
   * If type is not specified, it will search the entire collection of event listeners.
   * @param removeAll (Optional) Removes all the listeners that matches the specified listener.
   * @returns Returns true if event listener is successfully
   * removed. Otherwise returns false.
   */
  removeEventListener(listener: EventListener, type?: string, removeAll?: boolean): boolean;

  /**
   * Removes event listeners of the specified type. If type
   * is not provided, removes all event listeners.
   * @param type (Optional) Type of event listeners to remove.
   */
  removeEventListeners(type?: string): void;

  /**
   * Copies event listeners from one event manager to another.
   * @param eventManager Event manager from which the listeners should be copied.
   * @param type (Optional) Type of the event listeners that should be copied.
   * @returns Returns false if any of the event listeners failed to be copied.
   * Otherwise returns true.
   */
  copyEventListeners(eventManager: IEventManager, type?: string): boolean;
}
