/* eslint-disable import/no-extraneous-dependencies */
import merge from "webpack-merge";
import config from "./webpack.base.config";

export default merge(config, {
  mode: "development",
  devtool: "eval-source-map",
  module: {
    rules: [
      {
        test: /\.(le|c)ss$/,
        use: ["style-loader", "css-loader", "postcss-loader", "less-loader"],
        exclude: /node_modules/,
      },
    ],
  },
});
