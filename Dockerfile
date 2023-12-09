FROM node:18-alpine

# Step 4.1 - Add container working directory
WORKDIR /app

COPY index.js app/index.js   

# Step 4.2 - Copy npm dependencies

COPY package.json /app/package.json

RUN npm i -g nodemon

# Step 4.3 - Install dependencies 

RUN  npm install

RUN npm i express

RUN npm i cors

RUN npm i firebase

RUN npm i http-server

RUN npm i lowdb

RUN npm i mocha

RUN npm i mongodb

RUN npm i supertest

RUN npm i concurrently

#Copy app source code
COPY . .

# Expose port and start application
EXPOSE 3001

CMD ["npm", "start"]