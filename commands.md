# s-a-tanjim.github.io

# Building Process
The building process has two steps. 1) Build bootstrap & 2) Build the app.

## Build Bootstrap
```bash
# Go to bootstrap root dir
$ cd bootstrap
# build bootstrap
$ npm run build
```
## Build the app

```bash
# install dependencies
$ npm install

# serve with hot reload at localhost:3000
$ npx nuxi dev

# build for production and launch server
$ npm run build
$ npm run start

# generate static project
$ npm run generate
$ npx nuxi generate
```

## Testing with http server
```
$ python3 -m http.server 9000
```