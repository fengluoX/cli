/* eslint-disable import/no-extraneous-dependencies */
import { ConfigOptions } from "webpack-cli";
import HtmlWebpackPlugin from "html-webpack-plugin";
import CopyWebpackPlugin from "copy-webpack-plugin";
import path from "path";

export default {
  entry: path.resolve(__dirname, "../src/index.ts"),
  output: {
    path: path.resolve(__dirname, "../dist/"),
    filename: "[name].[fullhash:6].js",
    clean: true,
  },
  module: {
    rules: [
      {
        test: /\.(t|j)sx?$/,
        use: ["babel-loader"],
        exclude: /node_modules/, // 排除node_modules目录
      },
      {
        test: /\.(png|jpg|gif|jpeg|webp|svg|eot|ttf|woff|woff2)$/,
        type: "asset",
        parser: {
          dataUrlCondition: {
            maxSize: 10 * 1024, // 10kb
          },
        },
        generator: {
          filename: "static/[hash][ext][query]",
        },
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, "../public/index.html"),
      minify: {
        removeAttributeQuotes: false, // 是否删除属性的双引号
        collapseWhitespace: false, // 是否折叠空白
      },
    }),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, "../static"),
          to: path.resolve(__dirname, "../dist/static"),
        },
      ],
    }),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "../src"),
    },
    extensions: [".ts", ".tsx", ".js", ".jsx"],
  },
} as ConfigOptions;
