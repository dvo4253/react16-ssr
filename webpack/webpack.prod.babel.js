import webpack from 'webpack';
import merge from 'webpack-merge';
import UglifyJsPlugin from 'uglifyjs-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import OptimizeCSSAssetsPlugin from 'optimize-css-assets-webpack-plugin';
import common from './webpack.common.babel';

const prodModules = {
	rules: [
		{
			test: /\.scss$/,
			use: [
				MiniCssExtractPlugin.loader,
				'css-loader',
				'postcss-loader',
				'sass-loader',
			],
		},
	],
};

const prodPlugins = [
	new MiniCssExtractPlugin({
		filename: '[name].[chunkhash].css',
	}),
	new webpack.DefinePlugin({
		'process.env': {
			NODE_ENV: JSON.stringify('production'),
		},
	}),
];

const prodOptimizations = {
	minimizer: [
		new UglifyJsPlugin({
			cache: true,
			parallel: true,
			sourceMap: true, // set to true if you want JS source maps
		}),
		new OptimizeCSSAssetsPlugin({}),
	],
};

const prodConfig = merge({
	mode: 'production',
	devtool: 'source-map', // source maps
	entry: {
		app: [
			'./src/app/client.js',
		],
		styles: './src/app/styles/entry.scss',
	},
	output: {
		filename: '[name].[chunkhash].js',
	},
	module: prodModules,
	plugins: prodPlugins,
	optimization: prodOptimizations,
}, common);

module.exports = prodConfig;
