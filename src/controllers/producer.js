"use strict";
const dbFunctions = require('./dbFunctions')


// Handler of post message  
exports.post = async (req, res) => {
    try {
        var message = ""
        await dbFunctions.createMessage(req.body)
            .then(function (message) {
                res.json(message)
            })
        if (message == "Success") {
            res.status(200).json(message);
        }
        else {
            res.statusMessage = message;
            res.status(500).end();
        }
        
    } catch (error) {
        console.error(`Error while posting message `, error.message);
        res.status(error.statusCode || 500).json({ 'message': error.message });
    }
};