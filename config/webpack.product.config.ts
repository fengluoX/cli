/* eslint-disable import/no-extraneous-dependencies */
import merge from "webpack-merge";
import MiniCssExtractPlugin from "mini-css-extract-plugin";
import CssMinimizerPlugin from "css-minimizer-webpack-plugin";
import config from "./webpack.base.config";

export default merge(config, {
  mode: "production",
  module: {
    rules: [
      {
        test: /\.(le|c)ss$/,
        use: [
          MiniCssExtractPlugin.loader,
          "css-loader",
          "postcss-loader",
          "less-loader",
        ],
        exclude: /node_modules/,
      },
    ],
  },
  plugins: [new MiniCssExtractPlugin()],
  optimization: {
    minimizer: [
      // For webpack@5 you can use the `...` syntax to extend existing minimizers (i.e. `terser-webpack-plugin`), uncomment the next line
      // `...`,
      new CssMinimizerPlugin(),
    ],
  },
});
