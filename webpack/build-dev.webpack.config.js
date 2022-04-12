const CopyPlugin = require("copy-webpack-plugin")
const path = require("path")
module.exports = {
  watch: false,
  mode: "development",
  resolve: {
    extensions: [".ts", ".tsx", ".js", ".json"],
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: "ts-loader",
        exclude: /node_modules/,
      },
      {
        test: /\.s?css$/,
        use: [
          "style-loader", // creates style nodes from JS strings
          "css-loader", // translates CSS into CommonJS
          "sass-loader", // compiles Sass to CSS, using Node Sass by default
        ],
      },

      {
        test: /\.(jpe?g|png|gif|svg)$/i,
        use: [
          // "file-loader?hash=sha512&digest=hex&name=[hash].[ext]",
          // "image-webpack-loader",
          "base64-inline-loader?limit=1000&name=[name].[ext]",
        ],
      },

      // {
      //   test: /\.(jpe?g|png|ttf|eot|svg|woff(2)?)(\?[a-z0-9=&.]+)?$/,
      // },
    ],
  },
  entry: {
    // also place popup somewhere later on
    document: path.resolve(
      __dirname,
      "..",
      "src",
      "extension",
      "document",
      "app.tsx"
    ),
  },
  output: {
    path: path.resolve(__dirname, "..", "dist"),
    filename: "script/bundle.js",
    publicPath: "",
  },
  plugins: [
    // Copy manifest over
    new CopyPlugin([
      {
        from: path.resolve(__dirname, "..", "src", "extension", "*"),
        to: ".",
        transformPath: (currpath) => currpath.replace("src/extension", ""),
        include: [".json"],
      },
    ]),
  ],
}
