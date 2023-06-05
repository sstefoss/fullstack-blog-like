FROM node:16-alpine
RUN apk update && apk add socat git openssh-client && rm -rf /var/cache/apk/*

WORKDIR /usr/src/app
COPY package.json ./

RUN npm i 
COPY . .

EXPOSE 4000 
CMD ["npm", "run", "dev"]