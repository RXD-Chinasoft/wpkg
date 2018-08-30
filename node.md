##使用webpack
初始化package.json
npm init -y

-全局 webpack
、、、
npm install -g webpack //版本冲突

-本地安装
、、、
npm install webpack webpack-cli -D //D 线下用，打包就不用

##在webpack中所有文件都是模块
-js模块 模块化(AMD CMD es6Module commonjs)
；
##直接允许webpack
、、、
npx webpack//直接执行相关安装文件，去node_modules对应的.bin下的webpack.cmd，没安装的话，先安装
npm install webpack-dev-server -D 是内存打包，区分于production;是以文件夹启动的，如果在启动文件夹如build下建立一个新文件，浏览器也能访问的到
npm install clean-webpack-plugin -D 清除打包

##webpack
-plugin
-loader //解析模块化

##css 处理
    style-loader css-loader less less-loader node-sass sass-loader
##css抽离
    npm install extract-text-webpack-plugin@next  有可能被mini-css-extract-plugin替代，但目前有bug

    npm install purifycss-webpack purify-css glob -D //purifycss-webpack内部依赖purifycss-css，搜索使用glob？

    npm install postcss-loader autoprefixer -D //自动加前缀

    npm install copy-webpack-plugin -D //原封不动copy
    