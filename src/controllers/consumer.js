"use strict";
const dbFunctions = require('./dbFunctions')

// Handler of get message
exports.get = async (req, res) => {
    try {
        await dbFunctions.getMessages()
            .then(function (data) {
                res.json(data)
            })
    }
    catch (err) {
        console.error(`Error while getting messages `, err.message);
        res.status(err.statusCode || 500).json({ 'message': err.message });
    }
};