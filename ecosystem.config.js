module.exports = {
apps : [{
script: 'npm start'
}],

deploy : {
production : {

key  : 'frontendGolfhom2june.pem ' ,
user : 'ubuntu',
host : '3.84.180.86',
ref  : 'origin/main',
repo : ' git@github.com:Suryavanshi-Ventures/Golfhom-Frontend.git ' ,
path : '/home/ubuntu ' ,
  'pre-deploy-local' : ' ' ,

  'post-deploy': 'source ~/.nvm/nvm.sh && npm install && npm run build && pm2 reload ecosystem.config.js --env production' ,
  'pre-setup'  : ' ' ,
  'ssh_options' : 'ForwardAgent=yes' 

     } 

   }

};
