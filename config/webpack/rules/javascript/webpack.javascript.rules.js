export const createJSRules = () => ({
  test: /\.m?js$/,
  resolve: {
    fullySpecified: false, // disable the behaviour
  },
});
