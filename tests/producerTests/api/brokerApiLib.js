// API for ease of communication with Message-Broker

var request = require('request');

var optionsGet = {
    uri: 'http://localhost:3000/message-broker/v1/consumer/messages',
    method: 'GET',
    headers: {
    }
};

var optionsPost = {
    uri: 'http://localhost:3000/message-broker/v1/producer/messages',
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    }
};

// Callback to retrieve the stored messages in the broker
function getQueueFromBroker(callback) {
    request.get(optionsGet, function (error, response) {
        if (error) throw new Error(error);
        callback(JSON.parse(response.body).data);
    });
}

// Callback to send a message to the broker
/* params
        message: JSON object contain the message to be sent
*/
function sendMessageToBroker(message, callback) {
    optionsPost['body'] = JSON.stringify(message);
    request(optionsPost, function (error, response) {
        if (error) throw new Error(error);
        if (response.statusCode == 200) {
            callback(JSON.parse(response.body));
        }
        else {
            callback(response)
        }
    });
}

module.exports = {
    getQueueFromBroker,
    sendMessageToBroker
}