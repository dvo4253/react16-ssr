import path from 'path';
import webpack from 'webpack';
import merge from 'webpack-merge';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import AssetsPlugin from 'assets-webpack-plugin';

import common from './webpack.common.babel';

const fileRoot = process.cwd();

const devPlugins = [
	new AssetsPlugin({
		filename: 'assets.json',
		path: path.join(fileRoot, '/dist/public'),
	}),
	new MiniCssExtractPlugin({
		filename: '[name].css',
	}),
	new webpack.NamedModulesPlugin(),
	new webpack.HotModuleReplacementPlugin(),
	// new BundleAnalyzerPlugin() // enable for the bundle analyzer to show in browser
];

const devConfig = merge({
	mode: 'development',
	devtool: 'eval-source-map', // source maps
	entry: {
		app: [
			'react-hot-loader/babel',
			'webpack-dev-server/client?http://localhost:3000',
			'webpack/hot/only-dev-server',
			'./src/app/client.js',
		],
		styles: './src/app/styles/entry.scss',
	},
	output: {
		filename: '[name].js',
		publicPath: 'http://localhost:3000/dist/public',
	},
	devServer: {
		contentBase: path.join(fileRoot, 'dist/public'),
		compress: true,
		port: 3000,
	},
	plugins: devPlugins,
}, common);

export default devConfig;
