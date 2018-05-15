module.exports = {
  entry: './src/index.js',
  mode: 'development',
  output: {
    path: __dirname + '/build/',
    filename: 'bundle.js'
  },
  module: {
    rules: [
	    { 
	      test: /\.js$/, 
	      exclude: /node_modules/, 
	      loader: "babel-loader" 
	    },
    ]
  },
    node: {
        fs: "empty",
        net: "empty",
        tls: "empty"
    }
};