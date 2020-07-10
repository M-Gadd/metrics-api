FROM node:alpine

COPY . /app
#Prepare the client
WORKDIR /app/client
RUN yarn install --no-cache && yarn build && yarn global add serve

#Prepare the server
WORKDIR /app/server
RUN npm install --no-cache

EXPOSE 5000

CMD [ "npm", "start", "index.js" ]
