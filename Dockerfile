FROM node:16-alpine

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

ENV STAGE=PROD

RUN npm run deploy

CMD ["npm", "start"]
