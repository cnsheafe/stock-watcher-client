const Server = require("./server.js");
const port = process.env.PORT || 8080;
const app = Server.app();

const webpack = require("webpack");
const webpackDevMiddleware = require("webpack-dev-middleware");
const webpackHotMiddleware = require("webpack-hot-middleware");
const config = require("./webpack.prod.js");
const compiler = webpack(config);

app.use(webpackHotMiddleware(compiler));
app.use(
  webpackDevMiddleware(compiler, {
    noInfo: true,
    publicPath: config.output.publicPath
  })
);

app.listen(port);
console.log(`Listening at http://localhost:${port}`);
