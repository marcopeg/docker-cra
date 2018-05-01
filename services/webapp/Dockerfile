FROM node:9.9

# Add source code
ADD . /usr/src/app

# Install & build
WORKDIR /usr/src/app/
RUN yarn install
RUN yarn build

# Set the volume for the static app so that a proxy (NGiNX)
# can read files and serve them statically
VOLUME /usr/src/app/build

# Prepare the server for startup
WORKDIR /usr/src/app/
ENTRYPOINT ["yarn", "start:prod:api"]