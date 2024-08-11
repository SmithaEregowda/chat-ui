const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    '/api',
    createProxyMiddleware({
      target: 'https://chat-apis-crde.onrender.com/',
      changeOrigin: true,
    })
  );
};