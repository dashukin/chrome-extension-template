import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const SRC_DIR = path.resolve(__dirname, '../../src');
export const POPUP_SRC_DIR = path.resolve(SRC_DIR, './popup');
export const POPUP_SCRIPT_SRC = path.resolve(POPUP_SRC_DIR, './popup');
export const POPUP_HTML_SRC = path.resolve(POPUP_SRC_DIR, './popup.html');

export const ICONS_SRC_DIR = path.resolve(SRC_DIR, './icons');

export const CONTENT_SRC_DIR = path.resolve(SRC_DIR, './content');
export const CONTENT_SCRIPT_SRC = path.resolve(SRC_DIR, './content/content');

export const BACKGROUND_SRC_DIR = path.resolve(SRC_DIR, './background');
export const BACKGROUND_SCRIPT_SRC = path.resolve(SRC_DIR, './background/background');

export const DIST_DIR = path.resolve(__dirname, '../../dist');
export const EXTENSION_DIST_DIR = path.resolve(DIST_DIR, './extension');
export const MANIFEST_DIST = path.resolve(EXTENSION_DIST_DIR, './manifest.json');
export const ICONS_DIST_DIR = path.resolve(EXTENSION_DIST_DIR, './icons');
export const COMPRESSED_EXTENSION_DIST = path.resolve(DIST_DIR, './extension.zip');