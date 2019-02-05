'use strict';

const get = require('lodash.get');
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
  //console.log(`Dialogflow Request headers: ${JSON.stringify(request.headers)}`);
  //console.log(`Dialogflow Request body: ${JSON.stringify(request.body)}`);

  const agent = new WebhookClient({ request, response });
  let intentMap = new Map();

  function convert(agent) {
    try {
      const { quantity, from, to } = agent.parameters;
      const conv = convert(quantity).from(from).to(to);
      agent.add(`${quantity.toFixed(2)} ${from} in ${to} is ${conv.toFixed(2)}`);
    } catch(err) {
      console.log(err);
      agent.add('Something went wrong with the requested conversion.');
    }
  }

  intentMap.set('convert', convert);
  agent.handleRequest(intentMap);
});

app.listen(config.port, () =>
  console.log(`Fullfillment listening on the port ${config.port}!`),
);
