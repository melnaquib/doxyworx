const path = require('path')
const { merge } = require('webpack-merge')
const commonConfiguration = require('./webpack.common.js')
const portFinderSync = require('portfinder-sync')
const fs = require('fs');

const infoColor = (_message) =>
{
    return `\u001b[1m\u001b[34m${_message}\u001b[39m\u001b[22m`
}

module.exports = merge(
    commonConfiguration,
    {
        stats: 'errors-warnings',
        mode: 'development',
        infrastructureLogging:
        {
            level: 'warn',
        },
        devServer:
        {
            // host: 'local-ip',
            // host: '0.0.0.0',
            host: '127.0.0.1',
            // public: 'local.api.example.com',
            // public: 'doxyworx.com',
            port: portFinderSync.getPort(8080),
            open: true,
            https: true,
            allowedHosts: 'all',
            watchFiles: ['src/**', 'static/**'],
            static:
            {
                watch: true,
                directory: path.join(__dirname, '../static')
            },
            client:
            {
                logging: 'none',
                overlay: true,
                progress: false
            },
            setupMiddlewares: function (middlewares, devServer)
            {
                console.log('------------------------------------------------------------')
                console.log(devServer.options.host)
                const port = devServer.options.port
                const https = devServer.options.https ? 's' : ''
                const domain1 = `http${https}://${devServer.options.host}:${port}`
                const domain2 = `http${https}://localhost:${port}`

                console.log(`Project running at:\n  - ${infoColor(domain1)}\n  - ${infoColor(domain2)}`)

                return middlewares
            },
            https: {
                key: fs.readFileSync('/home/ubuntu/access/doxyworx_com.key'),
                cert: fs.readFileSync('/home/ubuntu/access/crt/doxyworx_com.crt'),
            },
            headers: {
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, PATCH, OPTIONS",
                "Access-Control-Allow-Headers": "X-Requested-With, content-type, Authorization"
            },

            // reload
            hot: false,
            liveReload: false
            
        }
    }
)
