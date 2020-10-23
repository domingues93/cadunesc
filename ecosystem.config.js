module.exports = {
  apps : [{
    name: "cadunesc-panel",
    script: 'npx',
    args: "serve -s build -l 8001"
  }],

  deploy : {
    production : {
      user : 'domingues',
      host : '149.56.84.0',
      ref  : 'origin/master',
      repo : 'git@github.com:domingues93/cadunesc.git',
      path : '/home/domingues/cadunesc/web-panel',
      'pre-deploy-local': '',
      'post-deploy' : 'npx npm install && npm run build && pm2 startOrRestart ecosystem.config.js',
      'pre-setup': ''
    }
  }
};
