var HtmlWebpackPlugin = require("html-webpack-plugin");
module.exports = {
  mode: "development",
  entry: "./src/index.js",
  module: {
    rules: [
      {
        test: /\.(png|jpg)$/,
        use: ["file-loader"],
      },
    ],
  },
  output: {
    path: __dirname + "/dist",
    filename: "app.bundle.js",
  },
  devServer: {
    static: {
      directory: __dirname + "/dist/",
    },
    port: 8000,
    hot: true,
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: "AmongUs",
      minify: {
        collapseWhitespace: true,
      },
      hash: true,
      template: "./index.html",
    }),
  ],
};
