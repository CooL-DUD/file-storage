module.exports = {
    apps: [
        {
            name: 'file-sandyq',
            port: '3000',
            exec_mode: 'cluster',
            instances: 'max',
            script: './.output/server/index.mjs'
        }
    ],
    deploy : {
        // "production" is the environment name
        production : {
            user: 'root',
            host: ['207.154.229.180'],
            ref: 'origin/master',
            repo: 'git@github.com:CooL-DUD/file-storage.git',
            ssh_options: ['ForwardAgent=yes'],
            path: '/var/www/file-sandyq',
            'post-deploy' : 'npm install && npm run build && pm2 startOrRestart ecosystem.config.cjs --env production'
        }
    }
}
