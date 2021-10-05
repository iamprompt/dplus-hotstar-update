FROM node:16.6-alpine3.12

ENV FIRESTORE_EMULATOR_HOST="localhost:8080"
ENV GCLOUD_PROJECT="dplus-hotstar-th"
ENV DISCORD_WEBHOOK_ID=""
ENV DISCORD_WEBHOOK_TOKEN=""

EXPOSE 4000 5001 9000 8080 8085 5000 4200

# Working Directory
WORKDIR /dplus-hs-update

COPY . .
RUN yarn install
RUN apk update \ 
    && apk add --no-cache git \
    && yarn global add firebase-tools \
    && apk add --update --no-cache openjdk8
ENV JAVA_HOME /usr/lib/jvm/java-1.8-openjdk
ENV PATH $PATH:%JAVA_HOME%/bin

CMD ["yarn", "dev"]