/** @var {Object} webpack.BannerPlugin */
/** @var {Object} webpack.ProvidePlugin */
// noinspection NodeJsCodingAssistanceForCoreModules
/**
 * @typedef {Object} Environment
 * @property {boolean} development
 * @property {boolean} production
 * @property {boolean} withBabel
 * @property {boolean} withWatch
 */

const
  webpack = require(`webpack`),
  CopyWebpackPlugin = require('copy-webpack-plugin'),
  CleanWebpackPlugin = require(`clean-webpack-plugin`),
  WriteWebpackPlugin = require(`write-webpack-plugin`),
  generateManifest = require(`./scripts/generateManifest.js`),
  pathsToClean = [
    `build`
  ],
  BUILD_PATHS = {
    BACKGROUND: `build/js/background`,
    CONTENT: `build/js/content`,
    HISTORY: `build/js/history-sync`,
    OPTIONS: `build/js/options`,
    POPUP: `build/js/popup`,
    VENDOR: `build/js/vendor`
  },
  loaders = {
    style: {
      loader: `style-loader`,
      options: { singleton: true }
    },
    css: {
      loader: `css-loader`,
      options: { minimize: true }
    }
  }
;

module.exports = /** @param {Environment} env */env => {
  const configJson = env.test ? require('./config.dev.json') : require(`./config.json`);
  const entry = {
    [BUILD_PATHS.BACKGROUND]: [`./src/modules/background/index.js`],
    [BUILD_PATHS.CONTENT]: [`./src/modules/content/index.js`],
    [BUILD_PATHS.HISTORY]: [`./src/modules/history-sync/index.js`],
    [BUILD_PATHS.OPTIONS]: [`./src/modules/options/index.js`],
    [BUILD_PATHS.POPUP]: [`./src/modules/popup/index.js`],
    [BUILD_PATHS.VENDOR]: [`./src/modules/vendor/index.js`]
  };
  return {
    context: __dirname,
    entry,
    mode: env.production ? `production` : (env.development ? `development` : `none`),
    output: {
      path: __dirname,
      filename: `[name].js`
    },
    module: {
      rules: [
        {
          test: /settings\.js$/,
          loader: `string-replace-loader`,
          options: {
            multiple: [
              {search: `@@clientId`, replace: configJson.development.clientId},
              {search: `@@clientSecret`, replace: configJson.development.clientSecret},
              {search: `@@analyticsId`, replace: configJson.development.analyticsId},
              {search: `@@rollbarToken`, replace: configJson.development.rollbarToken},
              {search: `@@tmdbApiKey`, replace: configJson.development.tmdbApiKey}
            ]
          }
        },
        {
          test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
          use: [{
            loader: `file-loader`,
            options: {
              name: `[name].[ext]`,
              outputPath: `build/fonts/`,
              publicPath: `../fonts/`
            }
          }]
        },
        {
          test: /\.(jpg|png)$/,
          use: [{
            loader: `file-loader`,
            options: {
              name: `[name].[ext]`,
              outputPath: `build/images/`,
              publicPath: `../images/`
            }
          }]
        },
        {
          test: /\.css$/,
          loaders: [
            loaders.style,
            loaders.css
          ]
        },
        {
          test: /\.jsx?$/,
          exclude: /(node_modules|bower_components)/,
          use: {
            loader: `babel-loader`,
            options: {
              presets: [
                `@babel/preset-env`,
                `@babel/preset-react`
              ]
            }
          }
        }
      ]
    },
    plugins: [
      new CleanWebpackPlugin(pathsToClean),
      new CopyWebpackPlugin([
        {
          from: './node_modules/webextension-polyfill/dist/browser-polyfill.min.js',
          to: './build/js/lib/browser-polyfill.js',
          flatten: true
        },
        {
          from: `./src/html`,
          to: `./build/html`
        },
        {
          from: `./src/_locales`,
          to: `./build/_locales`
        }
      ]),
      new WriteWebpackPlugin([
        {
          name: `./build/manifest.json`,
          data: generateManifest()
        }
      ])
    ],
    watch: !!(env.development && env.watch),
    watchOptions: {
      ignored: /node_modules/,
      poll: 1000,
      aggregateTimeout: 1000
    },
    devtool: env.development ? `source-map` : false
  };
};
