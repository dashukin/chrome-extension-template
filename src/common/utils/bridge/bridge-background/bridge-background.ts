import type { BridgeBaseBackground, EventType, EventCallback } from '../bridge';
import { Bridge } from '../bridge';

export class BridgeBackground extends Bridge implements BridgeBaseBackground {
  ports: Map<number, chrome.runtime.Port>;

  constructor() {
    super();
    this.ports = new Map();
  }

  override connect = (): void => {
    chrome.runtime.onConnect.addListener((port) => {
      const connectedTab = port.sender?.tab;

      if (!connectedTab || !connectedTab.id) {
        return;
      }

      this.ports.set(connectedTab.id, port);

      port.onMessage.addListener((message: any) => {
        const { type: eventType, payload } = message;
        const callbacks = this.listeners[eventType] as EventCallback[] | undefined;

        if (Array.isArray(callbacks)) {
          for (const callback of callbacks) {
            callback({ type: eventType, payload, sender: port.sender });
          }
        }
      });

      port.onDisconnect.addListener((disconnectPort) => {
        const connectedTabId = disconnectPort.sender?.tab?.id;
        if (connectedTabId) {
          this.ports.delete(connectedTabId);
        }
      });
    });
  };

  sendMessage = (eventType: EventType, payload?: any): void => {
    const connectedPorts = Array.from(this.ports.values());

    for (const port of connectedPorts) {
      port.postMessage({
        type: eventType,
        payload,
      });
    }
  };
}
