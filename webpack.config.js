let path = require('path');
let HtmlWebpackPlugin = require('html-webpack-plugin');
let ExtractTextWebpackPlugin = require('extract-text-webpack-plugin');
let CleanWebpackPlugin = require('clean-webpack-plugin');
let styleScss = new ExtractTextWebpackPlugin('css/style.css');
let normalizeCss = new ExtractTextWebpackPlugin('css/normalize.css');

module.exports = {
  // **入口文件**
  entry: './src/index.js',

  // **出口文件**
  output: {
    filename: 'bundle.[hash:4].js', // 打包后的文件名称
    path: path.resolve('dist'), // 打包后的目录，必须是绝对路径
  },

  // *处理对应模块
  module: {
    rules: [
      {
        test: /\.css/,
        use:normalizeCss.extract({
            use: ['css-loader'], 
            publicPath: '../',
          })
      },
      {
        test: /\.scss/,
        use:styleScss.extract({
            use: ['css-loader','sass-loader','postcss-loader'],  // postcss-loader 添加 css3 前缀
          })
      },
      // 处理css中的图片地址
      {
        test: /\.(jpe?g|png|gif)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 8192, // 小于 8k 的图片自动转成 base64 格式，并且不会存在实体图片
              outputPath: 'images/', // 图片打包后存放的目录
            }
          }
        ]
      },
      // 处理页面 img 引用图片的地址
      {
        test: /\.(htm|html)$/,
        use: 'html-withimg-loader',
      },
      // 处理引用字体图片和svg图片
      {
        test: /\.(eot|ttf|woff|svg)$/,
        use: 'file-loader',
      },
      // 处理es6代码
      {
        test: /\.js$/,
        use: 'babel-loader',
        include: /src/, // 只转化 src 目录下的js
        exclude: /node_modules/, // 排除掉 node_modules ，优化打包速度
      }
    ]
  },

  // **对应的插件**
  plugins: [
    // 通过new一下这个类来使用插件
    new HtmlWebpackPlugin({
      template: './src/index.html', // 用哪个html作为模板 // 在 src 目录下创建一个 index.html 页面当做模板来用
      hash: true // 会在打包好的 bundle.js 后面加上 hash 串
    }),
    //new ExtractTextWebpackPlugin('css/style.css'),// 拆分后会把 css 文件放到 dist 目录下的 css/style.css
    styleScss,
    normalizeCss,
    new CleanWebpackPlugin('dist'), // 打包前先清空
  ],

  // **开发服务器配置**
  devServer: {
    contentBase: 'dist',
    host: 'localhost',
    port: 3000,
    open: true,
    hot: false,
    overlay:true,
  },

  // **模式配置**
  mode: 'development',

  // **开启调试**
  devtool: "source-map",
};
