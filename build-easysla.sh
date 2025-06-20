#!/bin/bash
node -v
echo EasySLA - Clean
echo ----------------------------------------------------------

rm -rf ./easysla-app
rm ./SSL/easysla.com.chained.crt
rm ./SSL/easysla.com.key

echo EasySLA Site - Build and Copy
echo ----------------------------------------------------------

cd ../EasySLA
pwd
git pull
cd ./Frontend/easysla-site
pwd
npm install
npm run build
cp -r dist ../../../EmagineDeploy/easysla-site

echo EasySLA App - Build and Copy
echo ----------------------------------------------------------

cd ../easysla-app
pwd
npm install --legacy-peer-deps
npm run build
cp -r dist ../../../EmagineDeploy/easysla-app

echo EasySLA SSL - Build and Copy
echo ----------------------------------------------------------

cd ../../SSL
pwd
cp easysla.com.chained.crt ../../EmagineDeploy/SSL
cp easysla.com.key ../../EmagineDeploy/SSL