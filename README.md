# minizoo-chatbot
Simple NodeJS DialogFlow fulfillment service who handle convert on the flight.

Mostly leverage the npm module [convert-units](https://github.com/ben-ng/convert-units) and [dialogflow-fulfillment](https://github.com/dialogflow/dialogflow-fulfillment-nodejs) with [express](https://github.com/expressjs/express).

# Local build and run

```
npm i
npm start
```

# Docker build

```
docker build -t minizoo-chatbot .
```

Note: built from node docker source