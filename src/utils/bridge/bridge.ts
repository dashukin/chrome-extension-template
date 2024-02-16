/* eslint-disable max-classes-per-file */
export type EventType = string;
export type EventCallback = ({
  type,
  payload,
  sender,
}: {
  type: EventType;
  payload: any;
  sender: chrome.runtime.MessageSender | undefined;
}) => void;
export interface EventPayload {
  type: EventType;
  payload: any;
}

export abstract class BridgeBase {
  connect!: () => void;
  addListener!: (eventType: EventType, callback: EventCallback) => void;
  removeListener!: (eventType: EventType, callback: EventCallback) => void;
}

export abstract class BridgeBaseClient extends BridgeBase {
  /*
   * Client port connected to service worker
   * */
  port!: chrome.runtime.Port;
  /*
   * Send message to service worker
   * */
  sendMessage!: (type: EventType, payload?: any) => void;
}

export abstract class BridgeBaseBackground extends BridgeBase {
  /*
   * Send message to all connected tabs
   * */
  sendMessage!: (type: EventType, payload?: any) => void;
}

export class Bridge implements BridgeBase {
  listeners: Record<EventType, EventCallback[]>;

  constructor() {
    this.listeners = {};
  }

  connect = (): void => {};

  addListener = (eventType: EventType, callback: EventCallback): void => {
    if (!this.listeners[eventType]) {
      this.listeners[eventType] = [];
    }
    this.listeners[eventType].push(callback);
  };

  removeListener = (eventType: EventType, callback?: EventCallback): void => {
    if (!this.listeners[eventType]) {
      return undefined;
    }

    if (!callback) {
      // eslint-disable-next-line @typescript-eslint/no-dynamic-delete
      delete this.listeners[eventType];
    } else {
      this.listeners[eventType] = this.listeners[eventType].filter((enabledCallback) => {
        return enabledCallback !== callback;
      });
    }

    return undefined;
  };
}
