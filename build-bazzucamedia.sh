#!/bin/bash
node -v
echo Bazzuca Media - Clean
echo ----------------------------------------------------------

rm -rf ./bazzuca-media
rm ./SSL/bazzuca.media.chained.crt
rm ./SSL/bazzuca.media.key

echo Bazzuca Media - Build and Copy
echo ----------------------------------------------------------

cd ../BazzucaMedia
pwd
git pull
cd ./Frontend/bazzuca-app
pwd
npm install
npm run build
cp -r dist ../../../EmagineDeploy/bazzuca-media
cd ../../SSL
pwd
cp bazzuca.media.chained.crt ../../EmagineDeploy/SSL
cp bazzuca.media.key ../../EmagineDeploy/SSL