FROM node:16.6-alpine3.12 AS builder

ENV DISCORD_WEBHOOK_ID=""
ENV DISCORD_WEBHOOK_TOKEN=""
ENV DATABASE_URL=""

# Working Directory
WORKDIR /dplus-hs-update

# A wildcard is used to ensure both package.json AND package-lock.json are copied
COPY package*.json ./
COPY prisma ./prisma/

# Install app dependencies
RUN yarn install

COPY . .

RUN yarn build

FROM node:16.6-alpine3.12

COPY --from=builder /dplus-hs-update/node_modules ./node_modules
COPY --from=builder /dplus-hs-update/package*.json ./
COPY --from=builder /dplus-hs-update/build ./build

CMD [ "yarn", "start" ]