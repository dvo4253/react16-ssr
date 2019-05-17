import path from 'path';
import webpack from 'webpack';
import merge from 'webpack-merge';
import TerserPlugin from 'terser-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import OptimizeCSSAssetsPlugin from 'optimize-css-assets-webpack-plugin';
import common from './webpack.common.babel';

const fileRoot = process.cwd();

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
		new TerserPlugin({
			terserOptions: {
				parallel: true,
				output: {
					comments: false,
				},
			},
		}),
		new OptimizeCSSAssetsPlugin({}),
	],
};

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
		{
			test: /.js$/,
			loader: 'babel-loader',
			include: path.join(fileRoot, 'src/app'),
		},
	],
};

const prodConfig = merge({
	mode: 'production',
	devtool: 'source-map', // source maps
	module: prodModules,
	entry: {
		app: [
			'./src/app/client.js',
		],
		styles: './src/app/styles/entry.scss',
	},
	output: {
		filename: '[name].[chunkhash].js',
	},
	plugins: prodPlugins,
	optimization: prodOptimizations,
}, common);

export default prodConfig;
