# Coronavirus RD admin
this app is the admin panel of the [coronavirus-rd](https://www.coronavirus-rd.com/) app

## require 
- nodejs

## How to setup this project
Copy the run firebase end template then you most edit it with you firebase credentails
- `cp src/firebaseEnvTemplate.js to src/firebaseEnd.js`

Instalar las dependencias
- `npm install`

#### Project
1. Fork and clone git repository.
```bash
>$ touch .env.development.local
``` 
2. Use the following firebase config for development
```txt
VUE_APP_FIREBASE_APIKEY=AIzaSyC75e2MJpejR3w2s5F173oUBks6D6UMMV4
VUE_APP_FIREBASE_AUTHDOMAIN=coronavirus-rd-dev.firebaseapp.com
VUE_APP_FIREBASE_BASEURL=https://coronavirus-rd-dev.firebaseio.com
VUE_APP_FIREBASE_PROJECTID=coronavirus-rd-dev
VUE_APP_FIREBASE_STORAGE_BUCKET=coronavirus-rd-dev.appspot.com
VUE_APP_FIREBASE_MESSAGING_ID=116223129618
VUE_APP_FIREBASE_APPID=1:116223129618:web:6ea052c525b2ae7f8500cb
VUE_APP_FIREBASE_MEASUREMENTID=G-XW1JWP29G4
```
3. From root of project, run `npm start`
Run the services and happy development
- `npm run start`

## Collaborators

- thanks to the [theme](https://mdbootstrap.com/docs/vue/)

