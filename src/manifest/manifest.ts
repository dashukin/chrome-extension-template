import { version } from '../../package.json';

export const manifest: chrome.runtime.ManifestV3 = {
  manifest_version: 3,
  name: 'Extension template',
  version: version,
  action: {
    default_icon: {
      16: './icons/action-icon16.png',
      24: './icons/action-icon24.png',
      32: './icons/action-icon32.png',
    },
    default_title: 'Example title',
    default_popup: './popup.html',
  },
  background: {
    service_worker: './scripts/background.js',
  },
  content_scripts: [
    {
      matches: ['https://*/*'],
      js: ['./scripts/content.js'],
      world: 'ISOLATED',
    },
  ],
};
