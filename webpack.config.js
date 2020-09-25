const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = (env, argv) => {
	let config = {
		entry: './client/index.js',
		output: {
			publicPath: '/',
			path: path.join(__dirname, '/build'),
			filename: '[name][hash].js'
		},
		resolve: {
			modules: ['node_modules'],
			mainFiles: ['index', 'script', 'styles'],
			extensions: ['.js', '.json', '.scss', '.ts'],
			alias: {
				components: path.resolve(__dirname, 'src/components')
			}
		},
		module: {
			rules: [
				{
					test: /\.js$/,
					exclude: /node_modules/,
					loaders: [
						{
							loader: 'babel-loader'
						}
					]
				},
				{
					test: /\.scss$/,
					use: [
						'style-loader',
						'css-loader',
						{
							loader: 'sass-loader'
						}
					]
				},
				{
					test: /\.(jpe?g|gif|png|svh|ico)$/,
					loaders: [
						{
							loader: 'file-loader'
						}
					]
				}
			]
		},
		plugins: [new HtmlWebpackPlugin({ template: './client/index.html' })]
	}

	if (argv.mode === 'development') {
		let devConfig = {
			mode: 'development',
			devtool: 'source-map',
			devServer: {
				hot: true,
				port: 3001,
				historyApiFallback: true,
				proxy: {
					'/api/**': {
						target: 'http://localhost:8888/',
						pathRewrite: { '^/api': '' },
						secure: false
					}
				}
			}
		}
		config = Object.assign(config, devConfig)
	}

	if (argv.mode === 'production') {
		let buildConfig = {
			mode: 'production',
			performance: {
				maxEntrypointSize: 512000,
				maxAssetSize: 512000,
				hints: false
			},
			optimization: {
				runtimeChunk: 'single',
				minimize: true,
				splitChunks: {
					chunks: 'all',
					maxInitialRequests: Infinity,
					minSize: 0,
					cacheGroups: {
						base1: {
							test: /[\\/]node_modules[\\/](react|react-dom|redux|react-redux|redux-thunk)[\\/]/,
							name: 'base1',
							chunks: 'all',
							reuseExistingChunk: true
						},
						base2: {
							test: /[\\/]node_modules[\\/](antd)[\\/]/,
							name: 'base2',
							chunks: 'all',
							reuseExistingChunk: true
						},
						components: {
							test: /[\\/](components|store)[\\/]/,
							name: 'components',
							chunks: 'all',
							reuseExistingChunk: true
						},
						assets: {
							test: /[\\/](assets)[\\/]/,
							name: 'assets',
							chunks: 'all',
							reuseExistingChunk: true
						}
					}
				}
			}
		}
		config = Object.assign(config, buildConfig)
	}
	return config
}
