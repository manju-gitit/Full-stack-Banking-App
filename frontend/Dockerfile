FROM node:14-slim

# Step 3.1 - Add working directory
WORKDIR /app
# Step 3.2 - Copy npm dependencies
COPY ./src/index.js /app/index.js

COPY package.json /app/package.json

COPY ./.env  /app/.env  

# Step 3.3 - install dependencies
RUN npm install

# Copy app source code  
COPY .  .

#EXPOSE port and start the application
EXPOSE 3000

CMD ["npm", "start"]