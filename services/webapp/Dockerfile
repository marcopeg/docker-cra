FROM node:9.9

# Add source code
ADD . /usr/src/app

# Install & build
WORKDIR /usr/src/app/
RUN yarn install
RUN yarn build

# Prepare the server for startup
WORKDIR /usr/src/app/
ENTRYPOINT ["yarn", "start:prod:api"]