#!/bin/bash
node -v

echo Emagine - Clean
echo ----------------------------------------------------------

rm -rf ./emagine
rm ./SSL/emagine.com.br.chained.crt
rm ./SSL/emagine.com.br.key

echo Emagine - Build and Copy
echo ----------------------------------------------------------

cd ../EmagineSite
pwd
git pull
cd ./Frontend/emagine-site
pwd
npm install
npm run build
cp -r dist ../../../EmagineDeploy/emagine
cd ../../SSL
pwd
cp emagine.com.br.chained.crt ../../EmagineDeploy/SSL
cp emagine.com.br.key ../../EmagineDeploy/SSL
cd ../../EmagineDeploy
pwd