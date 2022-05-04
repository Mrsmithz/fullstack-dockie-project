FROM node:16.14-alpine

WORKDIR /usr/app

COPY package.json ./

COPY yarn.lock ./

# for production image optimization
RUN yarn add sharp

RUN yarn install

COPY ./ ./

RUN npm run build

EXPOSE 3493

CMD ["npm", "start", "--", "-p", "3493"]

