FROM node:16.14

WORKDIR /usr/app

COPY package*.json ./

RUN yarn install

COPY ./ ./

EXPOSE 8001

CMD ["npm", "run", "build"]