const webpack = require('webpack');
const source = __dirname + '/src/background';
// process.env.BABEL_ENV = 'development'
process.env.BABEL_ENV = 'production';

const webpackEnv = process.env.BABEL_ENV;
const isEnvProduction = webpackEnv === 'production';

module.exports = {
  mode: webpackEnv,
  entry: __dirname + '/src/background/message.ts',
  output: {
    // path: __dirname + "/public/background",
    path: __dirname + '/dist/background',
    filename: 'message.js',
  },
  module: {
    rules: [
      {
        test: /\.ts?$/,
        include: source,
        loader: require.resolve('babel-loader'),
        options: {
          customize: require.resolve(
            'babel-preset-react-app/webpack-overrides',
          ),
          presets: [
            [
              require.resolve('babel-preset-react-app'),
              {
                runtime: 'automatic',
              },
            ],
          ],
          babelrc: false,
          configFile: false,
          compact: isEnvProduction,
        },
        // use: [
        //   {loader: 'babel-loader'},
        //   {loader: 'ts-loader'},
        // ]
      },
    ],
  },
  plugins: [
    new webpack.ProvidePlugin({
      Buffer: ['buffer', 'Buffer'],
    }),
    new webpack.ProvidePlugin({
      process: 'process/browser',
    }),
  ],
};
