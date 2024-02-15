// eslint-disable-next-line import/no-extraneous-dependencies
import CopyPlugin from 'copy-webpack-plugin';

export const createCopyPlugin = (options) => new CopyPlugin(options);
