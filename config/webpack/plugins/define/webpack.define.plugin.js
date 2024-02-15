import webpack from 'webpack';

export const createDefinePlugin = (props) => new webpack.DefinePlugin({...props});