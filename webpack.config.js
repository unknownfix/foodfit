const path = require("path");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const HTMLWebpackPlugin = require("html-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const isProd = process.env.NODE_ENV === "production";
const isDev = !isProd;

const filename = (ext) => (isDev ? `bundle.${ext}` : `bundle.[hash].${ext}`);

const jsLoaders = () => {
  const loaders = [{ loader: "ts-loader" }];

  if (isDev) {
    loaders.push("eslint-loader");
  }

  return loaders;
};

module.exports = {
  context: path.resolve(__dirname, "src"),
  mode: process.env.NODE_ENV,
  entry: ["./index.tsx"],
  output: {
    filename: filename("js"),
    path: path.resolve(__dirname, "dist"),
  },
  resolve: {
    extensions: [".js", ".jsx", ".ts", ".tsx"],
    alias: {
      "@": path.resolve(__dirname, "src"),
      "@design": path.resolve(__dirname, "src/design"),
    },
  },
  devtool: isDev ? "source-map" : false,
  devServer: {
    port: 3000,
    hot: isDev,
    historyApiFallback: true,
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HTMLWebpackPlugin({
      template: path.resolve(__dirname, "public/index.html"),
      minify: {
        removeComments: isProd,
        collapseWhitespace: isProd,
      },
    }),
    new CopyPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, "public/favicon.ico"),
          to: path.resolve(__dirname, "dist"),
        },
        {
          from: path.resolve(__dirname, "public/logo192.png"),
          to: path.resolve(__dirname, "dist"),
        },
        {
          from: path.resolve(__dirname, "public/manifest.json"),
          to: path.resolve(__dirname, "dist"),
        },
      ],
    }),
    new MiniCssExtractPlugin({
      filename: filename("css"),
    }),
  ],
  module: {
    rules: [
      {
        test: /\.s[ac]ss$/i,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              hmr: isDev,
              reloadAll: true,
            },
          },
          "css-loader",
          "sass-loader",
        ],
      },
      {
        test: /\.(js|jsx|tsx|ts)$/,
        exclude: /node_modules/,
        use: jsLoaders(),
      },
    ],
  },
};
