module.exports = {
  configureWebpack: {
    output: {
      library: 'PhaidraVueComponents',
      libraryExport: 'default'
    },
    module: {
      rules: [
        {
          test: /\.m?js$/,
          exclude: /(node_modules|bower_components)/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: ["@vue/app", '@babel/preset-env']
            }
          }
        }
      ]
    }
  }
}
