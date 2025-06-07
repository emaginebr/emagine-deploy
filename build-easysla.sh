#!/bin/bash
node -v
echo EasySLA - Clean
echo ----------------------------------------------------------

rm -rf ./easysla
rm ./SSL/easysla.com.chained.crt
rm ./SSL/easysla.com.key

echo EasySLA - Build and Copy
echo ----------------------------------------------------------

cd ../EasySLA
pwd
git pull
cd ./Frontend/easysla-app
pwd
npm install --legacy-peer-deps
npm run build
cp -r dist ../../../EmagineDeploy/easysla
cd ../../SSL
pwd
cp easysla.com.chained.crt ../../EmagineDeploy/SSL
cp easysla.com.key ../../EmagineDeploy/SSL