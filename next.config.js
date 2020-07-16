const withPlugins = require('next-compose-plugins');
const withCSS = require('@zeit/next-css');
const withSass = require('@zeit/next-sass');
const image = require('next-images');
const path = require('path');
const Dotenv = require('dotenv-webpack');
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

require('dotenv').config();

// TODO: manifest.json robot.txt sw.js

const withBundleAnalyzer = require('@next/bundle-analyzer')({
	enabled: process.env.ANALYZE === 'true'
})


module.exports = withPlugins([[withCSS], [withSass], [image], [withBundleAnalyzer], [new UglifyJsPlugin({
	test: /\.js($|\?)/i,
	sourceMap: true,
	uglifyOptions: {
		mangle: {
			keep_fnames: true,
		},
		compress: {
			warnings: false,
		},
		output: {
			beautify: false,
		},
	},
}),]], {
	compress: true,
	webpack: (config, { dev }) => {
		config.plugins = config.plugins || [];
		config.plugins = [
			...config.plugins,
			new Dotenv({
				path: path.join(__dirname, '.env'),
				systemvars: true
			})
		];
		config.optimization.minimizer = [];
		config.optimization.minimizer.push(new OptimizeCSSAssetsPlugin({}));

		if (dev) {
			config.node = {
				fs: 'empty'
			}
		}

		return config;
	}
});
