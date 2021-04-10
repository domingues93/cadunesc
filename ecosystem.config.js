module.exports = {
  apps : [{
    name: "cadunesc-panel",
    script: 'npx',
    args: "serve -s build -l 8001"
  }],

  deploy : {
    production : {
      user : 'domingues',
      host : '167.114.61.246 -p 2399',
      ref  : 'origin/master',
      repo : 'git@github.com:domingues93/cadunesc.git',
      path : '/home/domingues/node_applications/cadunesc/web-panel',
      'pre-deploy-local': '',
      'post-deploy' : 'npm install && npm run build && pm2 startOrRestart ecosystem.config.js',
      'pre-setup': ''
    }
  }
};
