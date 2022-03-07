#!/bin/bash
EXIT_STATUS=0

URL=http://localhost:3000/message-broker/v1/
GET_COMMAND=$(curl -s -X GET ${URL}consumer/messages)
GET_EXPECTED="{\"data\":[]}"

echo "Simple curl GET call"
if [ "$GET_COMMAND" = "$GET_EXPECTED" ] ; then
    echo " Result: OK"
else
    echo " Result: KO"
    EXIT_STATUS=1
fi

echo "Simple curl POST call"
POST_COMMAND=$(curl -s -d '{"test":"test"}' -H "Content-Type: application/json" -X POST ${URL}producer/messages)
POST_EXPECTED="{\"message\":\"Success\"}"

if [ "$POST_COMMAND" = "$POST_COMMAND" ] ; then
    echo " Result: OK"
else
    echo " Result: KO"
    EXIT_STATUS=1
fi

curl -s -X GET ${URL}consumer/messages > /dev/null
exit $EXIT_STATUS