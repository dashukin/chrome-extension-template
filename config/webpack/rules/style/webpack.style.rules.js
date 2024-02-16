// eslint-disable-next-line import/no-extraneous-dependencies
import ExtractCssChunks from 'extract-css-chunks-webpack-plugin';

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export const createStyleRules = () => ({
  test: /\.s?css$/,
  use: [
    {
      loader: ExtractCssChunks.loader,
    },
    {
      loader: 'css-loader',
      options: {
        sourceMap: true,
        modules: false,
      },
    },
    {
      loader: 'sass-loader',
      options: { sourceMap: true },
    },
  ],
});
