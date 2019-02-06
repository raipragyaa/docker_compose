FROM node:alpine

WORKDIR /usr/src/proxy

COPY package*.json ./

RUN npm install
RUN npm install -g nodemon

COPY . . 

EXPOSE 9000

CMD ["npm", "start"]