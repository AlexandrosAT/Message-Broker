# “Don’t shoot the messenger”

> Implementation of a simple message broker with the following functionality
> 1. A message producer can send messages to be stored in the broker
> 2. A message consumer can retrieve all unread messages. The messages are delivered at most once, there is no verification of receipt for them to be considered as read
## Sections:
1. Setting up the broker
2. RESTful API Endpoints
3. Utilizing the API
4. Testing

## Project Structure
```
.
├── api
│   └── brokerApiLib.js
├── db
│   └── init.sql
├── docker-compose.yml
├── README.md
├── src
│   ├── config.js
│   ├── controllers
│   │   ├── consumer.js
│   │   ├── dbFunctions.js
│   │   └── producer.js
│   ├── Dockerfile
│   ├── package.json
│   ├── package-lock.json
│   └── server.js
├── tests
│   ├── consumerTests
│   │   ├── api
│   │   │   └── brokerApiLib.js
│   │   ├── docker-compose.yml
│   │   ├── Dockerfile
│   │   ├── package.json
│   │   ├── package-lock.json
│   │   ├── simpleConsumer.js
│   │   └── spawnConsumers.sh
│   ├── curlTests
│   │   └── curlCalls.sh
│   ├── producerTests
│   │   ├── api
│   │   │   └── brokerApiLib.js
│   │   ├── docker-compose.yml
│   │   ├── Dockerfile
│   │   ├── package.json
│   │   ├── package-lock.json
│   │   ├── simpleProducer.js
│   │   └── spawnProducers.sh
│   ├── regression.sh
│   └── singleImageTests
│       ├── api
│       │   └── brokerApiLib.js
│       ├── execute.sh
│       └── regression.js
└── TODO.txt
```

## 1. Setting up the broker
After cloning this project, the broker can be started by running 

`docker-compose up --build` or `sudo docker-compose up --build`

At this point the broker is ready to receive and send messages either via cURL commands or by utilizing the API 

## 2. RESTful API Endpoints
- `GET /message-broker/v1/consumer/messages`
  - Gets the messages stored in the broker
  - Returns:
     - list of messages: `[{ < label >: '< contents >' }]`

- `POST /message-broker/v1/producer/messages`
  - Sends the messages to be stored in the broker
  - Returns:
     - "Success" or error message

## Error Reporting
The general convention of error reporting is as follows:
- The following HTTP Status codes are used when appropriate: `200`, `201`,`400`, `404`, and `410`.
- The following JSON status message is typically returned:
```
{
     status: 'error',
     error: '<error description>'
}
```

## 3. Utilizing the API
Two callback functions are available:

- 'getQueueFromBroker(callback)'
  - Gets the messages stored in the broker
  - Returns:
     - list of messages: `[{ < label >: '< contents >' }]`

- 'sendMessageToBroker(callback)'
  - Sends the messages to be stored in the broker
  - Returns:
     - "Success" or error message

## 4. Testing
A complete regression testing is done by calling `./regression.sh` or `sudo ./regression.sh`