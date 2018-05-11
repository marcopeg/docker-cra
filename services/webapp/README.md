# create-react-app with SSR

This demo app is based on the great 
[Create React App](https://github.com/facebookincubator/create-react-app).

But there is a twist to it. Here we use a couple of smart NPM packages to add some
really cool capabilities to the basic setup offered by CRA:

- [Webpack extensibility offered by `react-app-rewired`](https://www.npmjs.com/package/react-app-rewired)
- [Pure feature oriented development offered by `react-redux-feature`](https://www.npmjs.com/package/react-redux-feature)
- [Out of the box Server Side Rendering offered by `create-react-app-ssr`](https://www.npmjs.com/package/create-react-app-ssr)
- [Automatic code splitting offered by `react-loadable`](https://www.npmjs.com/package/react-loadable)

## Folder Structure

### /src

This is the React app source folder as it is created by `create-react-app`, no big deal
about it. But inside there are a couple of folders that are meant to make your life easier.

#### /src/components

I suggest you group here all your end-leaf `dumb components`.

Stuff like custom buttons or very project specific implementations of lists.
Stuff that is not meant to use a `children` property, so to speak.

#### /src/layouts

I suggest you group here all your `dump components` that are supposed to accept
a `children` property.

Stuff like cards, lists which accept custom items, ..., but are still very
project specific.

#### /src/styles

I suggest you put here you common stylesheet or variables declaration files.

Then I would put component specific css right beside the component file. In this demo
I make use of [radium](https://www.npmjs.com/package/radium) to implement inline stylesheets.
I like it a lot.

#### /src/lib

I suggest you put here all your functional libraries, here is the perfect place to put
code that is covered by unit tests :-)

#### /src/features

[to be completed]

#### /src/app

[to be completed]

### /ssr

This folder contains the `ExpressJS` server that provides SSR support and possibily some
data API for the app to consume.

There is very little here as we use the `create-react-app-ssr` package to implement the SSR
part. Most of the system is left open up to you for API implementation.

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

https://github.com/johnkmzhou/cordova-create-react-app
