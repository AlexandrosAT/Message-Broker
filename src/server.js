"use strict";

// TODO: Add the listening port in a configuration file
global.LISTENING_PORT = 3000;

var express = require('express');
var bodyParser = require('body-parser');
var errorHandler = require('errorhandler');

var app = express();
app.use(bodyParser.json());
app.use(errorHandler());

// Declaration of the listening port
app.set('port', LISTENING_PORT);

// Consumer and producer functions
var producerController = require('./controllers/producer');
var consumerController = require('./controllers/consumer');

app.post('/message-broker/v1/producer/messages', producerController.post);
app.get('/message-broker/v1/consumer/messages', consumerController.get);


// Start 
app.listen(app.get('port'), function () {
    console.log('Broker started and listening to port %d', app.get('port'));
});