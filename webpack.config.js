module.exports = {
  entry: "./src/index.ts",
  output: {
    filename: "./dist/bundle.js",
  },
  devtool: "source-map",
  resolve: {
    extensions: ["*", ".webpack.js", ".web.js", ".ts", ".tsx", ".js"]
  },

  module: {
    rules: [{
      test: /\.tsx?$/,
      use: 'ts-loader',
      exclude: /node_modules/
    }]
  },
};
