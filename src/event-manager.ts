import { IEventArguments } from "./event-arguments.i";
import { EventListener } from "./event-listener.t";
import { IEventManager } from "./event-manager.i";

export class EventManager implements IEventManager {

  private readonly eventListeners: Record<string, EventListener[]> = {};

  /**
   * Retrieves event listeners by event type.
   * @param type Type of event listeners that needs to be retrieved.
   * @returns Returns event listeners if available. Otherwise returns
   * 'undefined'.
   */
  private getEventListeners(type: string): EventListener[] {
    let eventListeners = this.eventListeners[type];

    if (!eventListeners) {
      eventListeners = [];
      this.eventListeners[type] = eventListeners;
    }

    return eventListeners;
  }

  protected fireEventListeners(eventArguments: IEventArguments): boolean {
    const listeners = this.getEventListeners(eventArguments.type);

    try {
      for (const listener of listeners) {
        try {
          listener(eventArguments);
        } catch (error) {
          // we won't throw if error occurs...
          console.error(`An error occurred while firing '${eventArguments.type}' event.`, error);
        }
      }
    } catch (error) {
      console.error(`An error occurred while itertating through '${eventArguments.type}' event listeners.`, error);

      return false;
    }

    return true;
  }

  addEventListener(type: string, listener: EventListener): boolean {
    if (typeof listener !== "function") { return false; }

    const listeners = this.getEventListeners(type);

    listeners.push(listener);

    return true;
  }

  removeEventListener(type: string, listener: EventListener): boolean {
    if (typeof listener !== "function") { return false; }

    const listeners = this.getEventListeners(type);

    for (let i = 0; i < listeners.length; i++) {
      if (listeners[i] === listener) {
        listeners.splice(i, 1);

        return true;
      }
    }

    return false;
  }
}
