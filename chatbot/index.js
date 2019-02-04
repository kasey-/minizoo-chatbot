'use strict';

const yaml = require('js-yaml');
const fs   = require('fs');
const cors = require('cors');
const express = require('express');
const bodyParser = require('body-parser');
const { WebhookClient } = require('dialogflow-fulfillment');
const convert = require('convert-units');

let config = {
  port:5000
};

try {
  config = yaml.safeLoad(fs.readFileSync('./config.yml', 'utf8'));
} catch (e) {
  console.log(e);
}

const app = express();

app.use(cors({ origin: true }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
//process.env.DEBUG = 'dialogflow:debug'

app.post('/chatbot/dialogflowFulfillment', (request, response) => {
  console.log(`Dialogflow Request headers: ${JSON.stringify(request.headers)}`);
  console.log(`Dialogflow Request body: ${JSON.stringify(request.body)}`);

  const agent = new WebhookClient({ request, response });
  let intentMap = new Map();

  function convert(agent) {
    console.log('Convert Agent: ');
    console.log(agent);
    const conv = convert(1).from('lb').to('kg');
    agent.add(`You requested a conversion`);
  }

  intentMap.set('convert', convert);
  agent.handleRequest(intentMap);
});

app.listen(config.port, () =>
  console.log(`Fullfillment listening on the port ${config.port}!`),
);
