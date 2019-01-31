FROM node

EXPOSE 5000

COPY ./chatbot /app
WORKDIR /app

RUN npm install

COPY . .

CMD [ "npm", "start" ]
