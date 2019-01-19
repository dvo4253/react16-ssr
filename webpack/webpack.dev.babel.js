import path from 'path';
import webpack from 'webpack';
import merge from 'webpack-merge';
import AssetsPlugin from 'assets-webpack-plugin';

import common from './webpack.common.babel';

const fileRoot = process.cwd();

const devModules = {
	rules: [
		{
			test: /\.scss$/,
			use: [
				'style-loader',
				'css-loader',
				'postcss-loader',
				'sass-loader',
			],
		},
	],
};

const devPlugins = [
	new AssetsPlugin({
		filename: 'assets.json',
		path: path.join(fileRoot, '/dist/public'),
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
	module: devModules,
	plugins: devPlugins,
}, common);

export default devConfig;
