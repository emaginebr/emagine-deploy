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
