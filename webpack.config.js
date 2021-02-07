const path = require('path')
const os = require('os');
const HTMLWebpackPlugin = require('html-webpack-plugin')
const {CleanWebpackPlugin} = require('clean-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const DashboardPlugin = require("webpack-dashboard/plugin");
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const OptimizeCssAssetWebpackPlugin = require('optimize-css-assets-webpack-plugin')
const TerserWebpackPlugin = require('terser-webpack-plugin')
const {BundleAnalyzerPlugin} = require('webpack-bundle-analyzer')
const ImageminPlugin = require('imagemin-webpack-plugin').default;


const isDev = process.env.NODE_ENV === 'development';
const isProd = !isDev;
console.log('IS DEV:', isDev);
console.log('IS PROD:', isProd);

const optimization = () => {
	const config = {
		splitChunks: {
		chunks: 'all'
	}
  }
  if (isProd) {
	config.minimizer = [
		new OptimizeCssAssetWebpackPlugin(),
		new TerserWebpackPlugin()
	]
  }
  return config
}

const filename = ext => isDev ? `[name].${ext}` : `[name].[hash].${ext}`;

const cssLoaders = extra => {
	const loaders = [
		{
			loader: MiniCssExtractPlugin.loader,
			options: {
				hmr: isDev,
				reloadAll: true	
			},
		},
		'css-loader'
	]

	if (extra) {
		loaders.push(extra); 
	}

	return loaders;
}

const plugins = () => {
	const base = [
	new HTMLWebpackPlugin({
		template: './index.pug',
		minify: {
			collapseWhitespace: isProd, // убрать отступы
			removeComments: isProd, // убрать комментарии
		}
	}),
	// new HtmlWebpackPlugin({ // Создает экземпляр 1 стр. 1 html файл = 1 экземпляр
	//  filename: 'test.html',
	//  template: PATHS.dev + 'pug/test.pug',
	// }),
	new CleanWebpackPlugin(),
	new DashboardPlugin(), // подключаем красивый интерфейс к webpack
	new CopyWebpackPlugin([
		{
			//копирует иконку
			from: path.resolve(__dirname, 'dev/favicon.ico'),
			to: path.resolve(__dirname, 'prod')
		},
	]),
	new MiniCssExtractPlugin({
		filename: filename('css')
		// path: path.resolve(__dirname, 'prod')
	}),
	isProd ? new ImageminPlugin({
		test: /\.(png|jpe?g|gif|ico|svg)$/i
	}):() => {},
  ]
  //при сбоорке на продакш запускает сервер BundleAnalyzerPlugin
  if (isProd) {
	base.push( new BundleAnalyzerPlugin())
  }

  return base;
}

module.exports = (env) => {
	const isProp = env === 'prop';
	if (isProp) {
		console.log(`IS PROP: ${isProp}\n`);
		console.log('Характеристика компьютера');
		console.log('========================================================');
		console.log(`Операционная система OS: ${os.platform()}\n`);
		console.log(`Архитектура процессора ARCH: ${os.arch()}\n`);
		console.log(`Инфа по процессорам CPUS:${os.cpus()}\n`);
		console.log(`Свободно памяти Free memory: ${ ((( os.freemem() ) / 1024 ) / 1024).toFixed(2)} Mb\n`);
		console.log(`Всего памяти  Total memory: ${((((os.totalmem()) / 1024 ) / 1024) / 1024).toFixed(2)} Gb\n`);
		console.log(`Домашняя директория Home Dir: ${os.homedir()}\n`);
		console.log(`Время работы On work: ${((os.uptime() / 60) / 60 ).toFixed(2)} hours\n`);
		console.log('========================================================');
		// счетчик остановки скрипта
		setTimeout((function() {
			console.log('Остановка скрипта');
			return process.exit(1);
		}), 1000);
	}

  return {
	  context: path.resolve(__dirname, 'dev'), // показывает исх. папку где лежат все исходники нашего приложения
	  mode: 'development',
	  entry: {
		main: ['@babel/polyfill', './main.js'],
		analytics: '@common/analytics.js'
	  },
	  output: {
		filename: filename('js'),
		path: path.resolve(__dirname, 'prod')
	  },
	  resolve: {
		extensions: ['.js', '.json', '.png', '.xml', '.csv'], // теперь в путях не надо писать расш. вызываемых файлов
		alias: {
		  '@models': path.resolve(__dirname, 'dev/blocks/common.blocks/common/models'),
		  '@common': path.resolve(__dirname, 'dev/blocks/common.blocks/common/'),
		  '@': path.resolve(__dirname, 'dev'),
		}
	  },
	  optimization: optimization(),
	  devServer: {
		port: 8080,
		hot: isDev
	  },
	  devtool: isDev ? 'source-map' : '',
	  plugins: plugins(),
	   module: {
		rules: [
		  {
			test: /\.css$/,
			use: cssLoaders() 
		  },
		  {
			test: /\.pug$/,
			loader: 'pug-loader',
			options: {
				pretty: isDev,
			}
		  },
		  {
			test: /\.s[ac]ss$$/,
			use: cssLoaders('sass-loader')
		  },
		  {
			//работа с изображениями
			test: /\.(png|jpe?g|svg|gif|ico)$/,
			use: [
				{
					loader: 'file-loader',
					options: {
						name: '[path][name].[ext]',
						outputPath: (file) => {
							return file
						}
					}
				}
			]
		  },
		  {
			//работа со шрифтами
			test: /\.(eot|otf|svg|ttf|woff|woff2)$/,
			use: [
				{
					loader: 'file-loader',
					options: {
						name: '[path][name].[ext]',
						outputPath: (file) => {
							return file
						}
					}
				}
			]
		  },
		  {
			test: /\.xml$/,
			use: ['xml-loader']
		  },
		  {
			test: /\.csv$/,
			use: ['csv-loader']
		  },
		  {
			test: /\.js$/,
			exclude: /node_modules/,
			loader: 'babel-loader',
			options: {
				plugins: [
					'@babel/plugin-proposal-class-properties'
				]
			}
		  }
		]
	  }
  };
 }