FROM nginx:alpine 

#WORKDIR /app

RUN mkdir -p /etc/nginx/ssl

COPY . .

COPY slaproyale /var/www/slaproyale.com/home
COPY ./SSL/slaproyale.com.chained.crt /etc/nginx/ssl
COPY ./SSL/slaproyale.com.key /etc/nginx/ssl

COPY monexup /var/www/monexup.com/home
COPY ./SSL/monexup.com.chained.crt /etc/nginx/ssl
COPY ./SSL/monexup.com.key /etc/nginx/ssl

COPY goblinwars-landing /var/www/goblinwars.net/home
COPY goblinwars-website /var/www/goblinwars.net/classic
COPY goblinwars-reborn /var/www/goblinwars.net/reborn
COPY ./SSL/goblinwars.net.chained.crt /etc/nginx/ssl
COPY ./SSL/goblinwars.net.key /etc/nginx/ssl

COPY emagine /var/www/emagine.com.br/home
COPY ./SSL/emagine.com.br.chained.crt /etc/nginx/ssl
COPY ./SSL/emagine.com.br.key /etc/nginx/ssl

COPY easysla-site /var/www/easysla.com/home
COPY easysla-app /var/www/easysla.com/app
COPY ./SSL/easysla.com.chained.crt /etc/nginx/ssl
COPY ./SSL/easysla.com.key /etc/nginx/ssl

COPY nochainswap /var/www/nochainswap.org/home
COPY ./SSL/nochainswap.org.chained.crt /etc/nginx/ssl
COPY ./SSL/nochainswap.org.key /etc/nginx/ssl

COPY pandoravault /var/www/pandoravault.com/home
COPY ./SSL/pandoravault.com.chained.crt /etc/nginx/ssl
COPY ./SSL/pandoravault.com.key /etc/nginx/ssl

COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 443

CMD ["nginx", "-g", "daemon off;"]