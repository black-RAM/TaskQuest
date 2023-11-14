const path = require("path")
const WorkboxPlugin = require("workbox-webpack-plugin")

module.exports = {
  mode: "development",
  entry: "./src/app.ts",
  output: {
    filename: "main.js",
    path: path.resolve(__dirname, 'dist')
  },
  module: {
    rules: [
      {
        test: /\.s[ac]ss$/,
        use: ["style-loader", "css-loader", "sass-loader"]
      },
      {
        test: /\.ts$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
    ]
  },
  resolve: {
    extensions: ['.ts', '.js'],
  },
  devtool: 'inline-source-map',
  devServer: {
    static: './dist',
  },
  plugins: [
    new WorkboxPlugin.GenerateSW({
      // these options encourage the ServiceWorkers to get in there fast
      // and not allow any straggling "old" SWs to hang around
      clientsClaim: true,
      skipWaiting: true,
      maximumFileSizeToCacheInBytes: 5 * 1024 * 1024, // cache the large main.js file
      runtimeCaching: [
        {
          urlPattern: /\.(?:html)$/, // cache index.html at runtime
          handler: 'StaleWhileRevalidate',
        },
      ],
    }),
  ]
}
