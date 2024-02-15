// eslint-disable-next-line import/no-extraneous-dependencies
import WebpackShellPlugin from 'webpack-shell-plugin-next';

export const createShellPlugin = (options) => new WebpackShellPlugin(options);
