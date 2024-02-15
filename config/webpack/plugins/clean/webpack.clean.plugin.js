import { CleanWebpackPlugin } from 'clean-webpack-plugin';

export const createCleanPlugin = () =>
  new CleanWebpackPlugin({
    verbose: false,
  });