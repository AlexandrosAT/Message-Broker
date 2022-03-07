var api = require('./api/brokerApiLib')

// TODO: Use a proper framework for regression testing
function assertEqual(expected, received) {
    if (expected == received) {
        console.log("\t Result: OK");
    }
    else {
        console.log("\t Result: KO");
        console.log("Output received was: " + received + "\nInstead of: " + expected)
        process.exit(1)
    }
}

// Get queue when the broker is empty
if (process.argv[2] == '0') {
    api.getQueueFromBroker(function (response) {
        console.log("Get queue when the broker is empty");
        assertEqual(0, response.length);
    });
}

// Send a message when the broker is empty + Get queue when the broker has one message
else if (process.argv[2] == '1') {
    message = {};
    message['message'] = "hello";
    api.sendMessageToBroker(message, function (response) {
        console.log("Send a message when the broker is empty");
        assertEqual("Success", response.message);
        api.getQueueFromBroker(function (response) {
            console.log("Get queue when the broker has one message");
            assertEqual(1, response.length);
        });
    });
}

// Send and retrieve multiple messages
else if (process.argv[2] == '2') {
    message = {};
    message['message'] = "hello";
    api.sendMessageToBroker(message, function (response) {
        console.log("Send and retrieve multiple messages");
        api.sendMessageToBroker(message, function (response) {
            api.getQueueFromBroker(function (response) {
                assertEqual(2, response.length);
            });
        });
    });
}

// Message too big
// Error message "Message cannot be longer than 1000 characters" has length 45
else if (process.argv[2] == '3') {
    var bigMessage = "0";
    for (i = 0; i < 10; i++) {
        bigMessage += bigMessage;
    }
    message = {};
    message['message'] = bigMessage;
    api.sendMessageToBroker(message, function (response) {
        console.log("Rejection of a big message");
        assertEqual(45, response.message.length);
    });
}
