module.exports = {
  presets: [
    [
      '@babel/preset-env',
      {
        corejs: {
          version: 3,
          proposals: true,
        },
        useBuiltIns: 'usage',
        targets: {
          browsers: ['last 2 versions', 'safari >= 11'],
          node: 'current',
        },
      },
    ],
  ],
  plugins: [
    '@babel/plugin-transform-runtime',
    '@babel/plugin-proposal-class-properties',
    '@babel/plugin-syntax-dynamic-import',
    '@babel/plugin-proposal-object-rest-spread',
    '@babel/plugin-transform-regenerator',
    '@babel/plugin-proposal-optional-chaining',
    '@babel/plugin-proposal-nullish-coalescing-operator',
  ],
  env: {
    production: {
      plugins: [],
    },
    development: {
      plugins: [],
    },
    test: {
      plugins: ['dynamic-import-node'],
    },
  },
};
