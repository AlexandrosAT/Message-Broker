var api = require('./api/brokerApiLib');

var message = {};
message['test'] = 'test';

for (i = 0; i<500; i++) {
    api.sendMessageToBroker(message, function(response) {
        console.log(response);
    });
}