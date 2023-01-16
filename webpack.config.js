// Generated using webpack-cli https://github.com/webpack/webpack-cli
const webpack = require("webpack");
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const WorkboxWebpackPlugin = require("workbox-webpack-plugin");

const isProduction = process.env.NODE_ENV == "production";

const stylesHandler = MiniCssExtractPlugin.loader;

const config = {
  entry: "./src/index.tsx",
  output: {
    path: path.resolve(__dirname, "dist"),
  },
  devServer: {
    open: true,
    host: "localhost",
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "index.html",
    }),

    new MiniCssExtractPlugin(),
    new webpack.DefinePlugin({
      "process.env.REACT_APP_END_POINT": JSON.stringify(process.env.REACT_APP_END_POINT)
      // "process.env.LAST_COMMIT": JSON.stringify(
      //   shell.exec("git rev-parse --short HEAD").stdout.trim()
      // ),
      // "process.env.BUILD_MODE": JSON.stringify(mode),
      // "process.env.SONIC_REALM": JSON.stringify(process.env.SONIC_REALM),
      // "process.env.SONIC_ENDPOINT": JSON.stringify(process.env.SONIC_ENDPOINT),
      // "process.env.AUTH_DOMAIN": JSON.stringify(process.env.AUTH_DOMAIN),
      // "process.env.USE_REALM_SERVICE": JSON.stringify(
      //   process.env.USE_REALM_SERVICE
      // ),
      // "process.env.USE_CONFIG_SERVICE": JSON.stringify(
      //   process.env.USE_CONFIG_SERVICE
      // ),
    }),

    // Add your plugins here
    // Learn more about plugins from https://webpack.js.org/configuration/plugins/
  ],
  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/i,
        loader: "ts-loader",
        exclude: ["/node_modules/"],
      },
      {
        test: /\.css$/i,
        use: [stylesHandler, "css-loader", "postcss-loader"],
      },
      {
        test: /\.(eot|svg|ttf|woff|woff2|png|jpg|gif)$/i,
        type: "asset",
      },

      // Add your rules for custom modules here
      // Learn more about loaders from https://webpack.js.org/loaders/
    ],
  },
  resolve: {
    extensions: [".tsx", ".ts", ".jsx", ".js", "..."],
  },
};

module.exports = () => {
  if (isProduction) {
    config.mode = "production";

    config.plugins.push(new WorkboxWebpackPlugin.GenerateSW());
  } else {
    config.mode = "development";
  }
  return config;
};
