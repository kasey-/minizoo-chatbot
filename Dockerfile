FROM node

EXPOSE 8080

COPY ./chatbot /app
WORKDIR /app

RUN npm install

COPY . .

CMD [ "npm", "start" ]
