FROM node:16-alpine
WORKDIR /app 
COPY package.json /app
RUN npm i 
COPY . /app
EXPOSE 3000 
CMD ["npm", "run", "dev"]