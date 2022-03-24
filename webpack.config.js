const HtmlWebpackPlugin = require("html-webpack-plugin");
const path = require("path");

const entryKeys = ["v1", "v2", "v3", "v4", "v5", "v6", "final"];

const entry = entryKeys.reduce((pre, cur) => {
  return {
    ...pre,
    [cur]: `./src/${cur}/index.js`,
  };
}, {});

const htmlPlugins = entryKeys.map((key) => {
  return new HtmlWebpackPlugin({
    template: path.join(__dirname, "./public/index.html"),
    filename: `${key}.html`,
    chunks: [key],
  });
});

module.exports = {
  mode: "development",
  entry,
  output: {
    path: path.join(__dirname, "/dist"),
    filename: "[id].js",
  },
  devServer: {
    static: {
      directory: path.join(__dirname, "public"),
    },
    compress: true,
    port: 9000,
  },
  module: {
    rules: [
      {
        test: /\.m?js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: [
              ["@babel/preset-env", { targets: "defaults" }],
              "@babel/preset-react",
            ],
          },
        },
      },
    ],
  },
  plugins: [...htmlPlugins],
};
