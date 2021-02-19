FROM golang:1-alpine

LABEL org.opencontainers.image.source https://github.com/atomgenie/ipfs-pinner

WORKDIR /app
COPY back .
RUN go build -o go-pinner

CMD ./go-pinner
