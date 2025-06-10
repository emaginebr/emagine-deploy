#!/bin/bash
node -v
echo NoChainSwap - Clean
echo ----------------------------------------------------------

rm -rf ./nochainswap
rm ./SSL/nochainswap.org.chained.crt
rm ./SSL/nochainswap.org.key

echo NoChainSwap - Build and Copy
echo ----------------------------------------------------------

cd ../NoChainSwap
pwd
git pull
cd ./Frontend/nochainswap-app
pwd
npm install
npm run build
cp -r dist ../../../EmagineDeploy/nochainswap
cd ../../SSL
pwd
cp nochainswap.org.chained.crt ../../EmagineDeploy/SSL
cp nochainswap.org.key ../../EmagineDeploy/SSL