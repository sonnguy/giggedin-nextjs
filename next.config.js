const withPlugins = require('next-compose-plugins');
const withCSS = require('@zeit/next-css');
const withSass = require('@zeit/next-sass');
const image = require('next-images');
const path = require('path');
const Dotenv = require('dotenv-webpack');

require('dotenv').config();

// TODO: manifest.json robot.txt sw.js

module.exports = withPlugins([ [ withCSS ], [ withSass ], [ image ] ], {
	webpack: (config, { dev }) => {
		config.plugins = config.plugins || [];
		config.plugins = [
			...config.plugins,
			new Dotenv({
				path: path.join(__dirname, '.env'),
				systemvars: true
			})
		];

		return config;
	}
});
