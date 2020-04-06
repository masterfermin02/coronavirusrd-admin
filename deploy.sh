#!/usr/bin/env sh

# abort on errors
set -e

# build
npm run build

# if you are deploying to firebase
firebase deploy
