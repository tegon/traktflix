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
  fs = require(`fs`),
  path = require(`path`),
  configJson = process.env.TEST ? require('./config.json.dev') : require(`./config.json`),
  packageJson = require(`./package.json`),
  webpack = require(`webpack`),
  CleanWebpackPlugin = require(`clean-webpack-plugin`),
  pathsToClean = [
    `app/fonts`,
    `app/img`,
    `app/js`
  ],
  BUILD_PATHS = {
    BACKGROUND: `app/js/background`,
    CONTENT: `app/js/content`,
    HISTORY: `app/js/history-sync`,
    OPTIONS: `app/js/options`,
    POPUP: `app/js/popup`,
    VENDOR: `app/js/vendor`
  },
  loaders = {
    style: {
      loader: `style-loader`,
      options: {
        singleton: true
      }
    },
    css: {
      loader: `css-loader`,
      options: {minimize: true}
    }
  }
;

module.exports = /** @param {Environment} env */env => {
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
              outputPath: `app/fonts/`,
              publicPath: `fonts/`
            }
          }]
        },
        {
          test: /\.(jpg|png)$/,
          use: [{
            loader: `file-loader`,
            options: {
              name: `[name].[ext]`,
              outputPath: `app/img/`,
              publicPath: `img/`
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
      new CleanWebpackPlugin(pathsToClean)
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
