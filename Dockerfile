FROM node:14-slim

# Step 4.1 - Add container working directory
WORKDIR /app
COPY index.js app/index.js   

# Step 4.2 - Copy npm dependencies
COPY package.json app/package.json

RUN npm i -g nodemon

# Step 4.3 - Install dependencies
RUN npm install

#Copy app source code

COPY . .

# Expose port and start application

EXPOSE 3001

CMD ["npm", "start"]