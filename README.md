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



