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
cd ../../../EmagineDeploy/SSL
pwd
cp easysla.com.chained.crt ../../EmagineDeploy/SSL
cp easysla.com.key ../../EmagineDeploy/SSL
cd ..
pwd
mkdir -p ./easysla/.well-known/pki-validation
cp ./SSL/ValidationFiles/AF60F4974F44AE3D9AA0AD8A01033A58.txt ./easysla/.well-known/pki-validation