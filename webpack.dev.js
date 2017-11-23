const merge = require("webpack-merge");
const common = require("./webpack.config.js");
const webpack = require("webpack");

module.exports = merge(common, {
  devtool: "inline-source-map",
  devServer: {
    contentBase: "./dist",
    hot: true
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: [
          {
            loader: "react-hot-loader/webpack"
          },
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
        use: [
          {
            loader: "style-loader"
          },
          { loader: "css-loader" },
          { loader: "sass-loader" }
        ]
      }
    ]
  },
  plugins: [
    new webpack.NamedModulesPlugin(),
    new webpack.HotModuleReplacementPlugin()
  ]
});
