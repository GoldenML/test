const { createProxyMiddleware } = require('http-proxy-middleware')

module.exports = function(app) {
  app.use(
    createProxyMiddleware('/IM/', {
      target: 'http://113.125.201.130:30264',
      changeOrigin: true,
    })
  )
  app.use(
    createProxyMiddleware('/user/', {
      target: 'http://127.0.0.1:8011',
      changeOrigin: true,
    })
  )
  app.use(
    createProxyMiddleware('/file/', {
      target: 'http://127.0.0.1:8011',
      changeOrigin: true,
    })
  )
}
