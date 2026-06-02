FROM nginx:alpine 

COPY builds/monexup /var/www/monexup.com/home
COPY builds/goblinwars-reborn /var/www/goblinwars.net/home
COPY builds/emagine /var/www/emagine.com.br/home
COPY builds/nauth /var/www/emagine.com.br/nauth
COPY builds/lofn /var/www/emagine.com.br/lofn
COPY builds/proxypay /var/www/emagine.com.br/proxypay
COPY builds/pandoravault /var/www/pandoravault.com/home
COPY builds/bazzuca-media /var/www/bazzuca.media/home
COPY builds/devblog /var/www/emagine.com.br/rodrigolandim
COPY builds/avabot /var/www/avabot.net/home
COPY builds/proxypay /var/www/proxypay.online/home
COPY builds/fortuno /var/www/fortuno.online/home
COPY builds/filhosdonada /var/www/filhosdonada.com/home

COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80 443

CMD ["nginx", "-g", "daemon off;"]