import type { BridgeBaseClient, EventType, EventCallback } from '../bridge';
import { Bridge } from '../bridge';

export class BridgeClient extends Bridge implements BridgeBaseClient {
  port: chrome.runtime.Port;

  constructor() {
    super();
    this.port = chrome.runtime.connect();
  }

  override connect = (): void => {
    this.port.onMessage.addListener((message: any) => {
      const { type: eventType, ...payload } = message;
      const callbacks = this.listeners[eventType] as EventCallback[] | undefined;

      if (Array.isArray(callbacks)) {
        for (const callback of callbacks) {
          callback({ type: eventType, payload, sender: undefined });
        }
      }

      return true;
    });
  };

  sendMessage = (eventType: EventType, payload?: any): void => {
    this.port.postMessage({ type: eventType, payload });
  };
}
