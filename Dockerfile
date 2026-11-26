FROM nginx:alpine 

COPY builds/monexup /var/www/monexup.com/home
COPY builds/goblinwars-reborn /var/www/goblinwars.net/home
COPY builds/pandoravault /var/www/pandoravault.com/home
COPY builds/bazzuca-media /var/www/bazzuca.media/home
COPY builds/proxypay /var/www/proxypay.online/home
COPY builds/fortuno /var/www/fortuno.online/home
COPY builds/filhosdonada /var/www/filhosdonada.com/home
COPY builds/jogodaeleicao /var/www/jogodaeleicao.com/home
COPY builds/roll6 /var/www/roll6.site/home
COPY builds/ambrosio /var/www/ambrosioai.site/home

COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80 443

CMD ["nginx", "-g", "daemon off;"]