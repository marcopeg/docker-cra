# Docker CRA

By cloning and running this repository you get:

- create-react-app
- server side rendering
- docker wrapper
- production image builder with NGiNX wrapper

## Quick start:

```
git clone git@github.com:marcopeg/docker-cra.git
cd docker-cra
docker-compose -f docker-compose.dev.yml up
```

It might take few minutes to download all the dependencies and build the
app bundle but then you should be able to use a fully server side rendered app at
`http://localhost:8080`

And if you open `http://localhost:3000` you have the development version of the
client app with _redux-dev-tools_ enabled, source maps and all the cool stuff.

## Run as Production

```
docker-compose -f docker-compose.prod.yml up
```

## Run without Docker

Move into the `webapp` service:

```
cd services/webapp
```

Create the basic environment variables needed by the server:

```
# .env.local
# (this file is gitignored)
SSR_ENABLED=yes
SSR_TIMEOUT=5000
SSR_ROOT=/Users/marcopeg/dev/marcopeg/docker-cra/services/webapp/build
SSR_PORT=8080
SSR_DISABLE_JS=no
```

Start the projec:

```
# Development mode
yarn start:dev

# Production mode
yarn start:prod
```



