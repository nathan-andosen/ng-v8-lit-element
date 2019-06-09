const webpack = require('webpack');
const pkg = require('./package.json');
const path = require('path');
 
module.exports = (config, options) => {
  config.plugins.push(
    new webpack.DefinePlugin({
      'APP_VERSION': JSON.stringify(pkg.version),
    }),
  );

  config.module.rules.push({
    test: /\.js$/,
    include: [
      path.resolve(__dirname, 'node_modules/lit-element'),
      path.resolve(__dirname, 'node_modules/lit-html')
    ],
    use: {
      loader: 'babel-loader',
      options: {
        presets: ['@babel/preset-env'],
        plugins: [
          [
            '@babel/plugin-transform-runtime',
            {
              "corejs": false,
              "helpers": false,
              "regenerator": true,
              "useESModules": false
            }
          ]
        ]
      }
    }
  });
  return config;
};