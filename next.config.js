/* eslint-disable import/no-extraneous-dependencies */
/* --------------------------------------------------------
* Author Tien Tran
* Email tientran0019@gmail.com
* Phone 0972970075
*
* Created: 2021-06-17 12:29:42
*------------------------------------------------------- */
const path = require('path');
const webpack = require('webpack');

const withAntdLess = require('next-plugin-antd-less');
const withBundleAnalyzer = require('@next/bundle-analyzer')({
	enabled: process.env.ANALYZE === 'true',
});
const lessToJS = require('less-vars-to-js');
const fs = require('fs');

const loadEnvConfig = require('./bin/env');

const regexEqual = (x, y) => {
	return (
		x instanceof RegExp &&
		y instanceof RegExp &&
		x.source === y.source &&
		x.global === y.global &&
		x.ignoreCase === y.ignoreCase &&
		x.multiline === y.multiline
	);
};

loadEnvConfig();

const antdVariables = lessToJS(fs.readFileSync(path.resolve(__dirname, 'src/styles/variables.less'), 'utf8'));

const nextConfig = withBundleAnalyzer(withAntdLess({
	// modifyVars: {
	// 	'hack': 'true;@import "~antd/lib/style/themes/compact.less";',
	// 	...antdVariables,
	// },
	lessVarsFilePath: './src/styles/variables.less',
	lessVarsFilePathAppendToEndOfContent: true,
	// optional https://github.com/webpack-contrib/css-loader#object

	// for Next.js ONLY
	reactStrictMode: true,

	// Other Config Here...

	webpack(config) {
		config.module.rules.push({
			test: /\.md$/,
			use: 'frontmatter-markdown-loader',
		});

		config.plugins.push(
			new webpack.EnvironmentPlugin({
				NODE_ENV: process.env.NODE_ENV,
				'THEME': { ...antdVariables },
			}),
		);

		// fix selector not pure according to this issue: https://github.com/vercel/next.js/issues/11629
		const oneOf = config.module.rules.find(
			rule => typeof rule.oneOf === 'object',
		);

		if (oneOf) {
			const moduleSassRule = oneOf.oneOf.find(rule => regexEqual(rule.test, /\.module\.(scss|sass)$/));

			if (moduleSassRule) {
				const cssLoader = moduleSassRule.use.find(({ loader }) => loader.includes('css-loader'));
				if (cssLoader) {
				// Use the default CSS modules mode. Next.js use 'pure'. Not sure of all implications
					cssLoader.options.modules.mode = 'local';
					cssLoader.options.modules.localIdentName = process.env.NODE_ENV !== 'production' ? '[folder]__[local]__[hash:4]' : '[hash:8]';
				}
			}
		}

		return config;
	},
}));

module.exports = nextConfig;
