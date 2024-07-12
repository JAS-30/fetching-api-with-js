const path = require('path');
module.exports = {
    //entry point
    entry: './src/main.js',
    //output
    output:{
        path: path.join(__dirname + '/dist'),
        filename: 'bundle.js'
    },
    mode: "development",
    devServer:{
        static:{
            directory: path.join(__dirname + '/src')
        },
        port: 3000,
        devMiddleware:{
            publicPath: 'https://localhost:3000/dist/',
        },
        hot:'only',
        open:true,
        historyApiFallback:{
            index: 'src/index.html'
        }
    },
}