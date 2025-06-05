#!/bin/bash
node -v
echo SlapRoyale - Clean
echo ----------------------------------------------------------

rm -rf ./slaproyale
rm ./SSL/slaproyale.com.chained.crt
rm ./SSL/slaproyale.com.key

echo SlapRoyale - Build and Copy
echo ----------------------------------------------------------

cd ../SlapRoyale
git pull
pwd
cd ./Frontend/website
pwd
npm install
npm run build
cp -r build ../../../EmagineDeploy/slaproyale
cp slaproyale.com.chained.crt ../../../EmagineDeploy/SSL
cp slaproyale.com.key ../../../EmagineDeploy/SSL
cd ../../../EmagineDeploy
pwd

echo GoblinWars - Clean
echo ----------------------------------------------------------

rm -rf ./goblinwars-landing
rm -rf ./goblinwars-website
rm ./SSL/goblinwars.net.chained.crt
rm ./SSL/goblinwars.net.key

echo GoblinWars - Build and Copy
echo ----------------------------------------------------------

cd ../GoblinWars
pwd
git pull
cd ./Frontend
pwd
cp -r landing-page ../../EmagineDeploy/goblinwars-landing

cd ./website
pwd
npm install
npm run build
cp -r build ../../../EmagineDeploy/goblinwars-website
cp goblinwars.net.chained.crt ../../../EmagineDeploy/SSL
cp goblinwars.net.key ../../../EmagineDeploy/SSL

cd ../../../EmagineDeploy
pwd

echo MonexUp - Clean
echo ----------------------------------------------------------

rm -rf ./monexup
rm ./SSL/monexup.com.chained.crt
rm ./SSL/monexup.com.key

echo MonexUp - Build and Copy
echo ----------------------------------------------------------

cd ../MonexUp
pwd
git pull
cd ./Frontend/monexup-app
pwd
npm install --legacy-peer-deps
npm run build
cp -r build ../../../EmagineDeploy/monexup
cp monexup.com.chained.crt ../../../EmagineDeploy/SSL
cp monexup.com.key ../../../EmagineDeploy/SSL
cd ../../../EmagineDeploy
pwd

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