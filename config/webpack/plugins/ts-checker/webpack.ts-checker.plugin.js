import ForkTsCheckerWebpackPlugin from 'fork-ts-checker-webpack-plugin';

export const createTsCheckerPlugin = () => new ForkTsCheckerWebpackPlugin();