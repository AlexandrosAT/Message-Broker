var api = require('./api/brokerApiLib')

api.getQueueFromBroker(function(response){
    console.log(response);
});
