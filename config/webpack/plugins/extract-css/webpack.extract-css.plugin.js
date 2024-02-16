import ExtractCssChunks from 'extract-css-chunks-webpack-plugin';
import { EXTENSION_DIST_DIR } from '../../../environment/environment.config.js';

export const createExtractCSSChunksPlugin = () =>
  new ExtractCssChunks({
    path: EXTENSION_DIST_DIR,
    filename: 'css/[name].css',
    chunkFilename: 'css/chunks/[id].css',
  });
