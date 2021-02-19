FROM node:15-alpine

LABEL org.opencontainers.image.source https://github.com/atomgenie/ipfs-pinner

WORKDIR /app
RUN apk add python3 make
COPY front/package.json .
COPY front/yarn.lock .
RUN yarn install
COPY front .
RUN yarn build

CMD yarn start -p 8080
