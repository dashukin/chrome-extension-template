import { BridgeClient } from '../utils/bridge-client';

console.info('content script initialised');

const bridge = new BridgeClient();

bridge.connect();

bridge.addListener('TAB_CONNECTED', ({ payload }) => {
  console.log(payload);
  document.body.setAttribute('extension-template', 'true');
});

bridge.sendMessage('TAB_CONNECT');
