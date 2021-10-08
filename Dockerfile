FROM node:16.6-alpine3.12

ENV DISCORD_WEBHOOK_ID=""
ENV DISCORD_WEBHOOK_TOKEN=""
ENV DATABASE_URL=""

# Working Directory
WORKDIR /dplus-hs-update

COPY . .
RUN yarn install
RUN yarn build

CMD ["yarn", "start"]