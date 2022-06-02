module.exports = {
    devServer: {
        proxy: {
            '/api': {
                ws: true,
                changeOrigin: true,
                target: 'https://api.steampowered.com/',
            },
        },
    },
    prdServer: {
        proxy: {
            '/api': {
                ws: true,
                changeOrigin: true,
                target: 'https://api.steampowered.com/',
            },
        },
    },
}
