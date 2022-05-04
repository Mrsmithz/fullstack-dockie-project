FROM node:16.14

WORKDIR /usr/app

COPY package*.json ./

RUN npm install

COPY ./ ./

RUN npm run test

EXPOSE 8349

CMD ["npm", "run", "build"]