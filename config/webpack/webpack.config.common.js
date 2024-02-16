import {
  POPUP_SCRIPT_SRC,
  POPUP_HTML_SRC,
  CONTENT_SCRIPT_SRC,
  BACKGROUND_SCRIPT_SRC,
  EXTENSION_DIST_DIR,
  ICONS_SRC_DIR,
  ICONS_DIST_DIR,
} from '../environment/environment.config.js';
import {
  createTsCheckerPlugin,
  createCleanPlugin,
  createCopyPlugin,
  createShellPlugin,
  createExtractCSSChunksPlugin,
} from './plugins/index.js';
import { createStyleRules, createJSRules, createTypeScriptRules } from './rules/index.js';
import { execSync } from 'child_process';

export const webpackConfigCommon = {
  entry: {
    popup: POPUP_SCRIPT_SRC,
    content: CONTENT_SCRIPT_SRC,
    background: BACKGROUND_SCRIPT_SRC,
  },
  output: {
    path: EXTENSION_DIST_DIR,
    filename: 'scripts/[name].js',
    chunkFilename: 'scripts/chunks/[name].js',
    publicPath: '/',
    hotUpdateMainFilename: 'hot/[hash].hot-update.json',
    hotUpdateChunkFilename: 'hot/[id].[hash].hot-update.js',
  },
  module: {
    rules: [createJSRules(), createTypeScriptRules(), createStyleRules()],
  },
  plugins: [
    createCleanPlugin(),
    createTsCheckerPlugin(),
    createExtractCSSChunksPlugin(),
    createCopyPlugin({
      patterns: [
        {
          from: POPUP_HTML_SRC,
          to: EXTENSION_DIST_DIR,
        },
      ],
    }),
    createCopyPlugin({
      patterns: [
        {
          from: ICONS_SRC_DIR,
          to: ICONS_DIST_DIR,
        },
      ],
    }),
    createShellPlugin({
      onAfterDone: {
        scripts: [
          () =>
            new Promise((resolve) => {
              execSync(`npm run build:manifest`);
              resolve();
            }),
        ],
      },
    }),
  ],
  resolve: {
    extensions: ['.js', '.mjs', '.ts', '.tsx'],
  },
};
