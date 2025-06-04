FROM nginx:alpine 

#WORKDIR /app

COPY . .

COPY slaproyale /var/www/slaproyale.com/home
COPY slaproyale.com.chained.crt /etc/nginx/ssl
COPY slaproyale.com.key /etc/nginx/ssl

COPY monexup /var/www/monexup.com/home
COPY monexup.com.chained.crt /etc/nginx/ssl
COPY monexup.com.key /etc/nginx/ssl

COPY goblinwars-landing /var/www/goblinwars.net/home
COPY goblinwars-website /var/www/goblinwars.net/classic
COPY goblinwars.net.chained.crt /etc/nginx/ssl
COPY goblinwars.net.key /etc/nginx/ssl

COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 443

CMD ["nginx", "-g", "daemon off;"]