module.exports = {
  apps : [{
    name: "cadunesc-panel",
    script: 'yarn run-server',
  }],

  deploy : {
    production : {
      user : 'domingues',
      host : '45.6.102.237',
      ref  : 'origin/master',
      repo : 'git@github.com:domingues93/cadunesc.git',
      path : '/home/domingues/node_applications/cadunesc/web-panel',
      'pre-deploy-local': '',
      'post-deploy' : 'yarn install && yarn build && pm2 startOrRestart ecosystem.config.js',
      'pre-setup': ''
    }
  }
};
