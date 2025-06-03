FROM nginx:alpine 

#WORKDIR /app

COPY . .

COPY slaproyale /var/www/slaproyale.com
COPY slaproyale.com.chained.crt /etc/nginx/ssl
COPY slaproyale.com.key /etc/nginx/ssl

COPY monexup /var/www/monexup.com
COPY monexup.com.chained.crt /etc/nginx/ssl
COPY monexup.com.key /etc/nginx/ssl

COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 443

CMD ["nginx", "-g", "daemon off;"]