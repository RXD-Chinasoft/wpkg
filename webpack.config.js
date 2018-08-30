// 基于node，所以基于commonjs规范

let path = require('path')
let HtmlWebpackPlugin = require('html-webpack-plugin')
let CleanWebpackPlugin = require('clean-webpack-plugin')
let webpack = require('webpack')
let ExtractTextWebpackPlugin = require('extract-text-webpack-plugin')
let LessExtract = new ExtractTextWebpackPlugin({
    filename: 'css/less.css',
    // disable: true //开发阶段无须抽离，因为无法热加载
})
let CssExtract = new ExtractTextWebpackPlugin({
    filename: 'css/css.css',
    // disable: true
})
let PurifycssWebpack = require('purifycss-webpack') //顺序要求，在html插件下面
let glob = require('glob')
let CopyWebpackPlugin = require('copy-webpack-plugin')

module.exports = {
    entry: './src/index.js', //入口
    output: {
        filename: 'build.[hash:8].js', // 默认main.js,随机8位，改过后重新打包，内容重新更新
        path: path.resolve('./build') //当前路径解析出绝对路径
    }, //输出
    devServer: {
        contentBase: './build', //以build下作为静态目录，否则就是http://localhost:8080/
        port: 3000,
        compress: true, //启动服务器压缩
        open: true, //自动打开浏览器
        hot: true
    }, //开发服务器
    module: {
        rules: [ //从右往左写,先解析css模块，再插入到style里
            {
                test: /\.css$/,
                // use: ['style-loader', 'css-loader']
                use: CssExtract.extract({ // 抽离的是link不是style
                    fallback: 'style-loader', //失败的时候使用的是style，可热加载是
                    use: [{
                            loader: 'css-loader'
                        },
                        {
                            loader: 'postcss-loader'
                        }
                    ] //对象写法，加参数
                })

            },
            // {
            //     test: /\.less$/,
            //     use: [{
            //         loader: 'style-loader'
            //     }, {
            //         loader: 'css-loader' //有热更新功能
            //     }, {
            //         loader: 'less-loader'
            //     }]
            // }
            {
                test: /\.less$/,
                use: LessExtract.extract({
                    fallback: 'style-loader', //失败的时候使用的是style，可热加载是
                    use: [{
                        loader: 'css-loader'
                    }, {
                        loader: 'less-loader'
                    }]
                })
            }
        ]
    }, //模块配置
    plugins: [
        // new ExtractTextWebpackPlugin({
        //     filename: 'css/index.css'//抽离的文件输出
        // }),
        LessExtract,
        CssExtract,
        new CopyWebpackPlugin([{
            from: './src/doc',
            to: 'public'
        }]),
        new webpack.HotModuleReplacementPlugin(), //
        new CleanWebpackPlugin(
            ['./build'] //清空也支持正则
        ),
        new HtmlWebpackPlugin({
            template: './src/index.html',
            title: 'name',
            hash: true, //清缓存
            // minify: {
            //     removeAttributeQuotes: true,
            //     collapseWhitespace: true
            // }
        }),
        new PurifycssWebpack({ //没用的css呗删掉
            paths: glob.sync(path.resolve('src/*html'))
        })
    ], //插件
    mode: 'development', //可以更改模式，开发阶段可看的懂
    resolve: {}, //配置解析
}
// 在wepack中安装开发服务器 webpack-dev-server
// webpack插件 将html打包到build下，可以自动引入生产的js //https://www.npmjs.com/package/html-webpack-plugin
// 抽离样式到一个css文件里