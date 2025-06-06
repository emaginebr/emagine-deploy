c:\"Program Files"\OpenSSL-Win64\bin\openssl genrsa -out privatekey.pem 2048
c:\"Program Files"\OpenSSL-Win64\bin\openssl req -new -key privatekey.pem -out server.csr
pause