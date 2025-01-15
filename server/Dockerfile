FROM node AS builder

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
COPY package*.json ./

RUN npm ci

COPY . .

RUN npm run build

FROM node:slim

ENV NODE_ENV production
USER node

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
COPY package*.json ./

RUN apt-get update && apt-get install -y python3 python3-pip build-essential && npm config set python /usr/bin/python3 && npm ci --production

COPY --from=builder /usr/src/app/dist ./dist

EXPOSE 8100
CMD [ "node", "dist/index.js" ]
