FROM golang:alpine

WORKDIR /app

COPY go.* .
RUN go mod download

COPY seed.go ./

RUN go build -o /seed

CMD ["/seed"]