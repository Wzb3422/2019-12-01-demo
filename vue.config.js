module.exports = {
  devServer: {
    proxy: {
      '/api': {
        target: 'https://demo.guoxy.top/',
        changeOrigin: true,
        pathRewrite: {
          '/api': '/'
        }
      }
    }
  }
}