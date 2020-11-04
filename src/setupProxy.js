const { createProxyMiddleware } = require('http-proxy-middleware')

module.exports = function(app) {
  app.use(
    createProxyMiddleware('/IM/', {
      target: 'http://113.125.201.130:30264',
      changeOrigin: true,
    })
  )
  app.use(
    createProxyMiddleware('/Zzjg/', {
      target: 'http://113.125.201.130:30288',
      changeOrigin: true,
    })
  )
  app.use(
    createProxyMiddleware('/user/', {
      // target: 'http://8.129.76.21:8011',
      target: 'http://127.0.0.1:8011',
      changeOrigin: true,
    })
  )
  app.use(
    createProxyMiddleware('/file/', {
      // target: 'http://8.129.76.21:8011',
      target: 'http://127.0.0.1:8011',
      changeOrigin: true,
    })
  )
  app.use(
    createProxyMiddleware('/grhx/', {
      // target: 'http://8.129.76.21:8011',
      target: 'http://127.0.0.1:8011',
      changeOrigin: true,
    })
  )
  app.use(
    createProxyMiddleware('/post/', {
      // target: 'http://8.129.76.21:8011',
      target: 'http://127.0.0.1:8011',
      changeOrigin: true,
    })
  )
}
