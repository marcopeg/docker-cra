# Docker CRA

By cloning and running this repository you get:

- create-react-app
- server side rendering
- docker wrapper
- production image builder with NGiNX wrapper

> This readme covers the Docker related side of this project, for details about
> the React / Express sides of it please refer to the
> [webapp readme](./services/webapp/README.md).

## Quick start:

```
git clone git@github.com:marcopeg/docker-cra.git
cd docker-cra
docker-compose -f docker-compose.dev.yml up
```

It might take few minutes to download all the dependencies but if you open 
`http://localhost:3000` you have the development version of the client app 
with _redux-dev-tools_ enabled, source maps and all the cool stuff.

Start playing with React in `./services/webapp/src/App.jsx` or extend the
available API in `./services/webapp/ssr/routes/index.js`.

## Run as Docker Project

`docker-cra` comes as a Docker wrapper, so you needn't to worry about locally 
installed software and frameworks.

### Development

```
docker-compose -f docker-compose.dev.yml up
```

A new NodeJS container (v9.9) is booted up and both `create-react-app` and
the`ExpressJS` server are being executed inside it by linking your local
source code folders as volumes.

### Production

```
docker-compose -f docker-compose.prod.yml up --build
```

A custom NodeJS image (v9.9) is built with the optimized frontend bundle generated
by `create-react-app` which is seved through the `ExpressJS` app.

The project is also set up so to generate and use an `NGiNX` proxy which will
serve out optimized static files from the React bundle. This image is totally
optional, you might or might not need it depending on your deployment strategies.

## Run without Docker

There are many reasons why you would want to run the project directly on NodeJS
and performances of your development machine is probably the most common one.

> I simply can't run Docker and expect good performances on my 2014's MacBook.  
> It's just not powerfull enough.

### Prerequisites

I tried to abstract every command as `package.json` script and I tested it all
on my MacBook, using Yarn and Node 9.9.

Most of the stuff should be compatible with slightly recent versions but I can't 
really tell, please try and contribute to the following list of tested versions:

- MacOS 10.13.4, NodeJS 9.9, yarn 1.6.0

### Step n.1 - Root Folder

Move into the `webapp` service, that is the Node app root:

```
cd services/webapp
```

### Step n.2 - Environment Variables

Create the basic environment variables needed by the server in a local enviroment
file `.env.local` which is already _gitignored_:

```
#
# .env.local
# (this file is gitignored)
#

SSR_ENABLED=yes
SSR_PORT=8080
SSR_ROOT=/{...absolute-path-to}.../docker-cra/services/webapp/build
SSR_TIMEOUT=5000
SSR_DISABLE_JS=no
```

**NOTE:** Please be carefull to provide the full absolute path to `SSR_ROOT`.

### Step n.3 - Start the Project

```
# Development mode
yarn start:dev

# Production mode
yarn start:prod
```

Look into `package.json` scripts section for more scripts that you may want to run.

## HowTo...

### Run development process in background

```
# Start the app
$> docker-compose -f docker-compose.dev.yml up -d

# Attach your terminal to the logs:
$> docker-compose -f docker-compose.dev.yml logs -f

# Detach from the logs:
$> Ctrl+c

# Close the app
$> docker-compose -f docker-compose.dev.yml down
```

### Install a new NPM package

```
1. Run the project in background
(see dedicated howto)

2. Gain access to the `webapp` container:
$> docker-compose -f docker-compose.dev.yml exec webapp bash

3. Install your dependencies with `yarn`:
$> yarn install md5

4. Exit to yout terminal session
$> exit
```