#!/bin/bash
node -v
echo NAuth - Clean
echo ----------------------------------------------------------

rm -rf ./nauth

echo NAuth - Build and Copy
echo ----------------------------------------------------------

cd ../NAuth
pwd
git pull
cd ./Frontend/nauth-app
pwd
npm install
npm run build
cp -r dist ../../../EmagineDeploy/nauth