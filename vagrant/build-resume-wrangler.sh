#!/usr/bin/env bash

echo "=============================="

echo "Staring $0"

echo "Copying repo to vagrant synced folder /siteCopyTemp.."

mkdir -p siteCopyTemp

cp -r ../front-end/build/* siteCopyTemp

vagrant up

echo "=============================="

exit 0;
