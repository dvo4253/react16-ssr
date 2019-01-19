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
];
// eslint-disable-next-line no-unused-expressions, global-require, import/no-extraneous-dependencies
process.env.BUNDLE_ANALYZER && devPlugins.push(new (require('webpack-bundle-analyzer').BundleAnalyzerPlugin)());

const devConfig = merge({
	mode: 'development',
	devtool: 'eval-source-map', // source maps
	entry: {
		app: [
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
		hot: true,
		contentBase: path.join(fileRoot, 'dist/public'),
		compress: true,
		port: 3000,
		headers: { 'Access-Control-Allow-Origin': '*' },
	},
	plugins: devPlugins,
}, common);

export default devConfig;
