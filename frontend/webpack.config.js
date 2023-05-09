const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { SourceMapDevToolPlugin } = require("webpack");
const webpack = require('webpack');

module.exports = {
  output: {
    path: path.join(__dirname, "/dist"), // the bundle output path
    filename: "bundle.js", // the name of the bundle
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "src/index.html",
      options: {
        favicon: './static/favicon_io/favicon-32x32.png'
      }
    }),
    new SourceMapDevToolPlugin({
      filename: "[file].map"
    }),
    new webpack.DefinePlugin({
      '__REACT_DEVTOOLS_GLOBAL_HOOK__': '({ isDisabled: true })'
    })
  ],
  devServer: {
    port: 3030,
    historyApiFallback: true,
    client: {logging: 'error'}
  },
  module: {
    rules: [
      {
        test: /\.svg$/,
        use: ['@svgr/webpack'],
      },
      {
        test: /\.(js|jsx)$/, // .js and .jsx files
        exclude: /node_modules/, // excluding the node_modules folder
        use: {
          loader: "babel-loader",
        },
      },
      // {
      //   test: /\.(sa|sc|c)ss$/, // styles files
      //   use: ["style-loader", "css-loader", "sass-loader"],
      // },
      { test: /\.scss$/, use: [ 
        { loader: "style-loader" },  // to inject the result into the DOM as a style block
        { loader: "css-modules-typescript-loader"},  // to generate a .d.ts module next to the .scss file (also requires a declaration.d.ts with "declare modules '*.scss';" in it to tell TypeScript that "import styles from './styles.scss';" means to load the module "./styles.scss.d.td")
        { loader: "css-loader", options: { modules: { localIdentName: "[local]--[hash:base64:5]",} } },  // to convert the resulting CSS to Javascript to be bundled (modules:true to rename CSS classes in output to cryptic identifiers, except if wrapped in a :global(...) pseudo class)
        { loader: "sass-loader" },  // to convert SASS to CSS
        // NOTE: The first build after adding/removing/renaming CSS classes fails, since the newly generated .d.ts typescript module is picked up only later
        ]
      }, 
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.m?js$/,
        enforce: 'pre',
        use: ['source-map-loader'],
      },
    ],
  },
  mode: 'development',
  resolve: {
		extensions: ['.tsx', '.ts', '.js', '.jsx'],
    alias: {
      '@styles': path.resolve(__dirname, 'src', 'styles'),
      '@static': path.resolve(__dirname, 'src', 'static'),
      '@components': path.resolve(__dirname, 'src', 'components'),
      '@interfaces': path.resolve(__dirname, 'src', 'interfaces'),
      '@layouts': path.resolve(__dirname, 'src', 'layouts'),
      '@services': path.resolve(__dirname, 'src', 'services'),
      '@pages': path.resolve(__dirname, 'src', 'pages'),
      '@routeProviders': path.resolve(__dirname, 'src', 'routeProviders'),
      '@routeGuards': path.resolve(__dirname, 'src', 'routeGuards')
    },
	},
};

