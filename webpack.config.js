const dir = __dirname;
module.exports = {
    //entry point
    entry: dir+'/src/main.js',
    //output
    output:{
        path: dir+'/dist',
        filename: 'bundle.js'
    }
}