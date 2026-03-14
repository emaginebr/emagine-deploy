FROM nginx:alpine 

COPY builds/monexup /var/www/monexup.com/home
COPY builds/goblinwars-reborn /var/www/goblinwars.net/home
COPY builds/emagine /var/www/emagine.com.br/home
COPY builds/nauth /var/www/emagine.com.br/nauth
COPY builds/easysla-site /var/www/easysla.com/home
COPY builds/easysla-app /var/www/easysla.com/app
COPY builds/nochainswap /var/www/nochainswap.org/home
COPY builds/pandoravault /var/www/pandoravault.com/home
COPY builds/bazzuca-media /var/www/bazzuca.media/home
COPY builds/devblog /var/www/emagine.com.br/rodrigolandim

COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80 443

CMD ["nginx", "-g", "daemon off;"]