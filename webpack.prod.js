const merge = require("webpack-merge");
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");
const common = require("./webpack.config.js");
const webpack = require("webpack");
const ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = merge(common, {
  devtool: "source-map",
  devServer: {
    contentBase: "./dist",
  },
  plugins: [
    new UglifyJsPlugin(),
    new ExtractTextPlugin({
      filename: "style.css",
      allChunks: true
    }),
    new webpack.DefinePlugin({
      "process.env.NODE_ENV": JSON.stringify("production")
    })
  ],
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: [
          {
            loader: "awesome-typescript-loader",
            options: {
              useBabel: true,
              babelOptions: {
                presets: ["env", "react"]
              },
              useCache: true
            }
          }
        ]
      },
      {
        test: /\.scss?$/,
        use: ExtractTextPlugin.extract({
          use: ["css-loader", "sass-loader"],
          fallback: "style-loader"
        })
      }
    ]
  }
});
