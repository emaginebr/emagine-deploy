#!/bin/bash
node -v
echo PandoraVault - Clean
echo ----------------------------------------------------------

rm -rf ./pandoravault
rm ./SSL/pandoravault.com.chained.crt
rm ./SSL/pandoravault.com.key

echo PandoraVault - Build and Copy
echo ----------------------------------------------------------

cd ../PandoraVault
pwd
git pull
cd ./Frontend/pandora-vault-app
pwd
npm install
npm run build
cp -r dist ../../../EmagineDeploy/pandoravault
cd ../../SSL
pwd
cp pandoravault.com.chained.crt ../../EmagineDeploy/SSL
cp pandoravault.com.key ../../EmagineDeploy/SSL