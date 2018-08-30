// 基于node，所以基于commonjs规范

let path = require('path')
let HtmlWebpackPlugin = require('html-webpack-plugin')
let CleanWebpackPlugin = require('clean-webpack-plugin')
module.exports = {
    // entry: './src/index.js'', //入口 单例',
    // entry: ['./src/index.js', './src/a.js'],//入口 数组',
    entry: {//入口 对象',
        index: './src/index.js',
        a: './src/a.js'
    },
    output: {
        // filename: 'build.[hash:8].js',// 默认main.js,随机8位，改过后重新打包，内容重新更新
        filename: '[name].[hash:8].js',// 多个出口，对应entry对象
        path: path.resolve('./build') //当前路径解析出绝对路径
    }, //输出
    devServer: {
        contentBase: './build',//以build下作为静态目录，否则就是http://localhost:8080/
        port: 3000,
        compress: true, //启动服务器压缩
        open:true, //自动打开浏览器
    }, //开发服务器
    module: {}, //模块配置
    plugins: [
        new CleanWebpackPlugin(
            ['./build']//清空也支持正则
        ),
        new HtmlWebpackPlugin({
            filename: 'a.html',
            template: './src/index.html',
            title: 'name',
            hash: true,//清缓存
            // minify: {
            //     removeAttributeQuotes: true,
            //     collapseWhitespace: true
            // },
            chunks: ['index'] //对应entry的js名称
        }),
        new HtmlWebpackPlugin({
            filename: 'b.html',
            template: './src/index.html',
            title: 'name',
            hash: true,//清缓存
            // minify: {
            //     removeAttributeQuotes: true,
            //     collapseWhitespace: true
            // },
            chunks: ['a']
        })
    ], //插件
    mode: 'development', //可以更改模式，开发阶段可看的懂
    resolve: {}, //配置解析
}
// 在wepack中安装开发服务器 webpack-dev-server
// webpack插件 将html打包到build下，可以自动引入生产的js //https://www.npmjs.com/package/html-webpack-plugin
