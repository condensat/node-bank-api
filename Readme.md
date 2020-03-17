# Condenstat node-js Bank Api

## Start node rpc exemple

```bash
    yarn rpc
```

## Build `bank-api.js`

```bash
    yarn build
```

## Start html exemple

```bash
    yarn start
```

Note: When working on localhost, web security must be disabled (see `--disable-web-security` on Chrome)


## Convert synaps.io to commonJS

```bash
	npx babel --plugins transform-es2015-modules-commonjs "node_modules/@synaps-id/synaps-js/index.js" > src/synaps/synaps.js 
```
