const path = require("path");
const { CheckerPlugin } = require("awesome-typescript-loader");
const webpack = require("webpack");

module.exports = {
  entry: "./src/index.tsx",
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "dist")
  },
  resolve: {
    extensions: [".ts", ".tsx", ".js", ".jsx"]
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
    new CheckerPlugin(),
    new webpack.NamedModulesPlugin(),
    new webpack.HotModuleReplacementPlugin()
  ],
  devtool: "inline-source-map",
  devServer: {
    contentBase: "./dist",
    hot: true
  }
};
