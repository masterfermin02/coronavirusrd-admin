#!/usr/bin/env sh

# abort on errors
set -e

# build
npm run build

# if you are deploying to a custom domain
#echo 'www.coronavirus-rd.com' > CNAME

git init
git add -A
git commit -m 'deploy'

# if you are deploying to firebase
firebase deploy
