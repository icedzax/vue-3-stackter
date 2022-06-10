module.exports = {
    publicPath: process.env.NODE_ENV === 'production' ? '/*' : '/*',
    devServer: {
        proxy: {
            '/api': {
                ws: true,
                changeOrigin: true,
                target: 'https://api.steampowered.com/',
            },
        },
    },
}
