var config = {
    entry: './main.js',
    output: {
        path:'/',
        filename: 'index.js',
    },
    devServer: {
        inline: true,
        port: 3003,
        headers: {
            "Access-Control-Allow-Origin": "http://localhost:3000",
            "Access-Control-Allow-Credentials": "true"
        }
    },
    module: {
        loaders: [
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                loader: 'babel-loader',
                query: {
                    presets: ['es2015', 'react', "stage-2"]
                }
            }
        ]
    }
}
module.exports = config;