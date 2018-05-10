const ExtractTextPlugin = require('extract-text-webpack-plugin');
const path = require('path');

module.exports = {
  entry: './webpack/app.js',
  output: {
    path: path.resolve(__dirname, '../'),
    filename: 'js/script.js'
  },
  module: {
        rules: [
            {
                test: /\.js$/,
                exclude: [/node_modules/],
                use: [{
                    loader: 'babel-loader',
                    options: {
                        presets: ['es2015']
                    }
                }]
            },
			{
			  test: /\.scss$/,
			  use: ExtractTextPlugin.extract({
				fallback: 'style-loader',
				use: ['css-loader', 'sass-loader']
			  })
			}
        ]
    },
	plugins: [
	 new ExtractTextPlugin('./css/style.css')
	]
};
