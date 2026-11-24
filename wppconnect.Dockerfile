FROM wppconnect/server-cli:1.3.78

WORKDIR /usr/src/wpp-server

# Dependencias nativas exigidas para compilar o sharp (usado pelo @wppconnect-team/wppconnect >= 2.x)
# node-gyp precisa estar no node_modules local (nao basta instalado globalmente),
# por isso entra na mesma chamada de npm install que instala o pacote principal.
RUN apk add --no-cache vips vips-dev fftw-dev gcc g++ make libc6-compat pkgconfig python3

RUN npm install node-gyp @wppconnect-team/wppconnect@2.4.6

COPY wppconnect.config.js ./src/config.ts
