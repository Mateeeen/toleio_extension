const CopyPlugin = require("copy-webpack-plugin")
const path = require("path")
module.exports = {
  watch: false,
  mode: "production",
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
        use: ["base64-inline-loader?limit=1000&name=[name].[ext]"],
      },
    ],
  },
  entry: {
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
    new CopyPlugin([
      {
        from: path.resolve(__dirname, "..", "src", "extension", "*"),
        to: ".",
        transformPath: (currpath) => currpath.replace("src/extension", ""),
        include: [".json"],
      },
    ]),
  ],
  performance: {
    hints: false,
  },
}
