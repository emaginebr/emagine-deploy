#!/bin/bash
node -v
echo GoblinWars - Clean
echo ----------------------------------------------------------

rm -rf ./goblinwars-classic
rm -rf ./goblinwars-reborn
rm ./SSL/goblinwars.net.chained.crt
rm ./SSL/goblinwars.net.key

echo GoblinWars - Build and Copy
echo ----------------------------------------------------------

cd ../gwr-website
pwd
git pull
cd ./gwc-website
pwd
npm install
npm run build
cp -r build ../../EmagineDeploy/goblinwars-classic
pause

cd ../gwr-website
pwd
npm install
npm run build
cp -r dist ../../../EmagineDeploy/goblinwars-reborn
cd ../SSL
pwd
cp goblinwars.net.chained.crt ../../../EmagineDeploy/SSL
cp goblinwars.net.key ../../../EmagineDeploy/SSL

cd ../../../EmagineDeploy
pwd