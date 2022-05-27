FROM node:16.14-alpine

WORKDIR /usr/app

COPY package.json ./

COPY yarn.lock ./

RUN yarn install

COPY ./ ./

EXPOSE 8001

CMD ["npm", "run", "build"]