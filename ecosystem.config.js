module.exports = {
  apps : [{
    name: "cadunesc-panel",
    script: 'npx',
    args: "serve -s build -l 8001"
  }],

  deploy : {
    production : {
      user : 'ubuntu',
      host : '51.79.87.90',
      ref  : 'origin/master',
      repo : 'git@github.com:domingues93/cadunesc.git',
      path : '/home/ubuntu/node_applications/cadunesc/web-panel',
      'pre-deploy-local': '',
      'post-deploy' : 'npm install && npm run build && pm2 startOrRestart ecosystem.config.js',
      'pre-setup': ''
    }
  }
};
