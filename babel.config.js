module.exports = function (api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      [
        'module-resolver',
        {
          root: ['./'],
          extensions: ['.ios.js', '.android.js', '.js', '.json'],
          alias: {
            assets: './assets',
            components: './components',
            consts: './consts',
            context: './context',
            screens: './screens',
            stacks: './stacks',
          },
        },
      ],
    ],
  };
};
