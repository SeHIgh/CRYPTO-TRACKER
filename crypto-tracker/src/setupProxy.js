const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = (app) => {
    app.use(
        '/api',
        createProxyMiddleware({
            target: "https://api.coinpaprika.com/v1",
            changeOrigin: true,
            pathRewrite: {
                '^/api':''
            }
        })
    )
}