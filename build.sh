#!/bin/bash
node -v
echo SlapRoyale - Clean
echo ----------------------------------------------------------

rm -rf ./slaproyale
rm slaproyale.com.chained.crt
rm slaproyale.com.key

echo SlapRoyale - Build and Copy
echo ----------------------------------------------------------

cd ../SlapRoyale/Frontend/website
pwd
npm install
npm run build
cp -r build ../../../EmagineDeploy/slaproyale
cp slaproyale.com.chained.crt ../../../EmagineDeploy
cp slaproyale.com.key ../../../EmagineDeploy
cd ../../../EmagineDeploy
pwd

echo MonexUp - Clean
echo ----------------------------------------------------------

rm -rf ./monexup
rm monexup.com.chained.crt
rm monexup.com.key

echo MonexUp - Build and Copy
echo ----------------------------------------------------------

cd ../MonexUp/Frontend/monexup-app
pwd
npm install
npm run build
cp -r build ../../../EmagineDeploy/monexup
cp monexup.com.chained.crt ../../../EmagineDeploy
cp monexup.com.key ../../../EmagineDeploy
cd ../../../EmagineDeploy
pwd