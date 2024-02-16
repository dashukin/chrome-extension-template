import { BridgeBackground } from '../utils/bridge-background';

console.info('background script inited');

const bridge: BridgeBackground = new BridgeBackground();

bridge.addListener('TAB_CONNECT', ({ sender }) => {
  if (sender?.tab?.id != null) {
    bridge.sendMessage('TAB_CONNECTED', { id: sender.tab.id });
  }
});

bridge.connect();
