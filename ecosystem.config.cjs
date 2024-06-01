module.exports = {
    apps: [
        {
            name: 'file-sandyq',
            port: '3000',
            exec_mode: 'cluster',
            instances: 'max',
            script: './.output/server/index.mjs'
        }
    ]
}
