import {merge} from 'webpack-merge';
import {webpackConfigCommon} from './webpack.config.common.js';
import {webpackConfigDev} from './webpack.config.dev.js';
import {webpackConfigProd} from './webpack.config.prod.js';

const webpackEnvConfig = process.env.NODE_ENV === 'production' ?  webpackConfigProd : webpackConfigDev;

export default merge(webpackConfigCommon, webpackEnvConfig);