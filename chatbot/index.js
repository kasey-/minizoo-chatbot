'use strict';

const cors = require('cors');
const express = require('express');
const bodyParser = require('body-parser');
const { WebhookClient } = require('dialogflow-fulfillment');

const port = 5000;
const app = express();

app.use(cors({ origin: true }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
// process.env.DEBUG = 'dialogflow:debug'

function convert(agent) {
  agent.add('You requested a conversion');
}

app.post('/chatbot/dialogflowFulfillment', (request, response) => {
  const agent = new WebhookClient({ request, response });
  let intentMap = new Map();

  intentMap.set('convert', convert(agent));
  agent.handleRequest(intentMap);
});

app.listen(port, () =>
  console.log(`Fullfillment listening on the port ${port}!`),
);
