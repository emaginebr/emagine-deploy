FROM nginx:alpine 

RUN mkdir -p /etc/nginx/ssl

COPY builds/slaproyale /var/www/slaproyale.com/home
COPY ./ssl/slaproyale.com.chained.crt /etc/nginx/ssl
COPY ./ssl/slaproyale.com.key /etc/nginx/ssl

COPY builds/monexup /var/www/monexup.com/home
COPY ./ssl/monexup.com.chained.crt /etc/nginx/ssl
COPY ./ssl/monexup.com.key /etc/nginx/ssl

COPY builds/goblinwars-reborn /var/www/goblinwars.net/home
COPY ./ssl/goblinwars.net.chained.crt /etc/nginx/ssl
COPY ./ssl/goblinwars.net.key /etc/nginx/ssl

COPY builds/emagine /var/www/emagine.com.br/home
COPY builds/nauth /var/www/emagine.com.br/nauth
COPY ./ssl/emagine.com.br.chained.crt /etc/nginx/ssl
COPY ./ssl/emagine.com.br.key /etc/nginx/ssl

COPY builds/easysla-site /var/www/easysla.com/home
COPY builds/easysla-app /var/www/easysla.com/app
COPY ./ssl/easysla.com.chained.crt /etc/nginx/ssl
COPY ./ssl/easysla.com.key /etc/nginx/ssl

COPY builds/nochainswap /var/www/nochainswap.org/home
COPY ./ssl/nochainswap.org.chained.crt /etc/nginx/ssl
COPY ./ssl/nochainswap.org.key /etc/nginx/ssl

COPY builds/pandoravault /var/www/pandoravault.com/home
COPY ./ssl/pandoravault.com.chained.crt /etc/nginx/ssl
COPY ./ssl/pandoravault.com.key /etc/nginx/ssl

COPY builds/bazzuca-media /var/www/bazzuca.media/home
COPY ./ssl/bazzuca.media.chained.crt /etc/nginx/ssl
COPY ./ssl/bazzuca.media.key /etc/nginx/ssl

COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80 443

CMD ["nginx", "-g", "daemon off;"]