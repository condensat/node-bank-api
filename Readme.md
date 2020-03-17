# Condenstat node-js Bank Api

## Start node rpc exemple

```bash
    yarn rpc
```

## Build `bank-api.js`

```bash
    yarn dist
```

## Convert synaps.io to commonJS

```bash
	npx babel --plugins transform-es2015-modules-commonjs "node_modules/@synaps-id/synaps-js/index.js" > src/synaps/synaps.js 
```

## one-liner

```
    yarn lint && yarn rpc && yarn clean && yarn synaps && yarn dist
```