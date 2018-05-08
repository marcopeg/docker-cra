# create-react-app with SSR

This demo app is based on the great 
[Create React App](https://github.com/facebookincubator/create-react-app).

## Environment Variables

### SSR_BLACKLIST

Cherry pick routes that you don't want to server side render:

```
SSR_BLACKLIST=/users*,/foo/:id/list
```


## Run in Cordova

```
Add to package.json

"homepage": "./"

```