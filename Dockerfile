FROM node 
WORKDIR /app
COPY . /app
RUN npm install
RUN npm run-script migrations
RUN npm run-script seeds
USER node 
CMD npm start