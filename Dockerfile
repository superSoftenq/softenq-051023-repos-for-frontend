FROM node:20.12.2
RUN mkdir -p /home/node/app && chown -R node:node /home/node/app
WORKDIR /home/node/app
COPY package*.json ./
USER node
RUN yarn --ignore-engines
COPY . .
RUN yarn build