import { IEventArguments } from "./event-arguments.i";
import { EventListener } from "./event-listener.t";
import { IEventManager } from "./event-manager.i";

export class EventManager implements IEventManager {

  private _eventListeners: Record<string, undefined | EventListener[]> = {};

  /**
   * This method returns all the event listener types.
   * @returns Returns an array of strings containing all event listener types.
   */
  private _getEventListenerTypes(): string[] {
    return Object.keys(this._eventListeners);
  }

  /**
   * Retrieves event listeners by event type.
   * @param type Type of event listeners that needs to be retrieved.
   * @param createIfNotDefined (Optional) If set to true, it creates
   * new array of event listeners if not already defined. Default value
   * is false.
   * @returns Returns event listeners if available. Otherwise returns
   * 'undefined'.
   */
  private _getEventListeners(type: string, createIfNotDefined = false): undefined | EventListener[] {
    let eventListeners = this._eventListeners[type];

    if (createIfNotDefined && !eventListeners) {
      eventListeners = [];
      this._eventListeners[type] = eventListeners;
    }

    return eventListeners;
  }

  /**
   * Dispatches event listeners. This method works exactly
   * like fireEventListeners() method.
   * @param eventArguments Arguments to pass to the event listeners.
   * @returns Returns true if event listeners are fired successfully.
   * Otherwise returns false.
   * @see {@link fireEventListeners}
   */
  protected dispatchEventListeners(eventArguments: IEventArguments): boolean {
    const listeners = this._getEventListeners(eventArguments.type);

    // Returns false if no listeners are available...
    if (!listeners) { return false; }

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

  /**
   * Fires event listeners.This method works exactly
   * like dispatchEventListeners() method.
   * @param eventArguments Arguments to pass to the event listeners.
   * @returns Returns true if event listeners are fired successfully.
   * Otherwise returns false.
   * @see {@link dispatchEventListeners}
   */
  protected fireEventListeners(eventArguments: IEventArguments): boolean {
    return this.dispatchEventListeners(eventArguments);
  }

  addEventListener(type: string, listener: EventListener): boolean {
    if (typeof listener !== "function") { return false; }

    const listeners = this._getEventListeners(type, true) as EventListener[];

    listeners.push(listener);

    return true;
  }

  removeEventListener(listener: EventListener, type?: string, removeAll = false): boolean {
    if (typeof listener !== "function") { return false; }

    let isRemoved = false;
    const types = type ? [type] : this._getEventListenerTypes();

    for (const _type of types) {
      const listeners = this._getEventListeners(_type);

      if (!listeners) { continue; }

      for (let i = 0; i < listeners.length; i++) {
        if (listeners[i] === listener) {
          listeners.splice(i, 1);

          if (!removeAll) { return true; }

          isRemoved = true;
        }
      }
    }

    return isRemoved;
  }

  removeEventListeners(type?: string): void {
    // if type is provided, we clear
    // event listeners of the specified type...
    if (type) {
      this._eventListeners[type] = undefined;

      return;
    }

    // otherwise we remove all event listeners...
    this._eventListeners = {};
  }
}
