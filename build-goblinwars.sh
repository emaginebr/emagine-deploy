#!/bin/bash
node -v
echo GoblinWars - Clean
echo ----------------------------------------------------------

rm -rf ./goblinwars-landing
rm -rf ./goblinwars-website
rm -rf ./goblinwars-reborn
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
cp -r gw-reborn ../../EmagineDeploy/goblinwars-reborn

cd ./website
pwd
npm install
npm run build
cp -r build ../../../EmagineDeploy/goblinwars-website
cp goblinwars.net.chained.crt ../../../EmagineDeploy/SSL
cp goblinwars.net.key ../../../EmagineDeploy/SSL

cd ../../../EmagineDeploy
pwd