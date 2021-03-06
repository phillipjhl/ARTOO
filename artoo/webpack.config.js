const path = require("path");
const ExtractTextPlugin = require("extract-text-webpack-plugin");

const CLIENT_DEST =
  process.env.NODE_ENV === "production"
    ? path.join(__dirname, "./_build/client/assets")
    : path.join(__dirname, "./client/dist");

const ASSET_PATH =
  process.env.NODE_ENV === "production" && process.env.ASSET_PATH
    ? process.env.ASSET_PATH
    : "static/";

module.exports = {
  entry: ["@babel/polyfill", "./client/index.js", "./client/styles/app.scss"],
  output: {
    filename: "[name].js",
    path: CLIENT_DEST,
    publicPath: ASSET_PATH,
  },
  mode: "development",
  devtool:
    process.env.NODE_ENV === "production" ? "source-map" : "inline-source-map",
  optimization: {
    moduleIds: "hashed",
    splitChunks: {
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name: "vendors",
          chunks: "all",
        },
      },
    },
  },
  module: {
    rules: [
      {
        test: /.jsx?$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env", "@babel/preset-react"],
          },
        },
      },
      {
        test: /\.(png|jpg|svg|gif)$/,
        use: {
          loader: "file-loader",
          options: {
            publicPath: "static/images/",
            outputPath: `${CLIENT_DEST}/images/`,
          },
        },
      },
      {
        test: /\.scss$/,
        use: ExtractTextPlugin.extract({
          fallback: "style-loader",
          use: "css-loader!sass-loader",
        }),
      },
      {
        test: /\.(pdf)$/,
        use: {
          loader: "file-loader",
          options: {
            publicPath: "static/docs",
            outputPath: `${CLIENT_DEST}/docs/`,
          },
        },
      },
    ],
  },
  resolve: {
    extensions: [".js", ".jsx"],
  },
  plugins: [
    new ExtractTextPlugin({ filename: "css/styles.css", allChunks: true }),
    // new webpack.DefinePlugin({
    //   "process.env.ASSET_PATH": JSON.stringify(ASSET_PATH)
    // })
  ],
};
