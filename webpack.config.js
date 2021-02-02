const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const HotModuleReplacementPlugin = require('hot-module-replacement');
const DashboardPlugin = require("webpack-dashboard/plugin");

module.exports = {
	context: path.resolve(__dirname, 'dev'),  // показывает исх. папку где лежат все исходники нашего приложения
	mode: 'development',
	entry: {
		main: './index.js',
		analytics: './analytics.js'
	},
	output: {
		filename: '[name].[hash].js',
		path: path.resolve(__dirname, 'dist')
	},
	devServer: {
		historyApiFallback: true,
		// overlay: true,
		contentBase: path.join(__dirname, 'dist'),
		compress: true,
		host: 'localhost',
		port: 8080,
		open: true,
		hot: true
	},
	plugins: [
		new HtmlWebpackPlugin({
			template: './index.html'
		}),
		new CleanWebpackPlugin(),
		// применять изменения только при горячей перезагрузке
		new webpack.HotModuleReplacementPlugin(),
		new DashboardPlugin(), // подключаем красивый интерфейс к webpack
	],
	module: {
		rules: [
			{
				test: /\.css$/,
				use: ['style-loader','css-loader']
			},
			{
				test: /\.(png|jpe?g|gif|ico|svg)$/,
				use: ['file-loader']
			},
			{
				test: /\.(eot|otf|svg|ttf|woff|woff2)$/,
				use: [
					{
						loader: 'file-loader',
						options: {
							name: '[path][name].[ext]',
							// помещает шрифты в папку /fonts
							outputPath: (file) => {
								let path = file.split("dev/")[1];
								let newPath = '../' + path;
								return newPath
							}
						}
					}
				]
			}
		]
	}
}