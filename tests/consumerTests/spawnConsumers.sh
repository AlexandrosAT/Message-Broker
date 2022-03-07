#!/bin/bash
#################################
#   Testing the result of having multiple consumers
#   Since the consumers are competing with each other,
#   only one will retrieve all the messages stored in the broker
#################################

echo
echo "Multiple consumers"
echo
EXIT_STATUS=0
CONSUMERS_OUTPUT=$(docker-compose up --build)
CONSUMERS_STATUS=$(echo $CONSUMERS_OUTPUT | grep "code 1")
CONSUMERS_WITHOUT_MESSAGES=$(echo $CONSUMERS_OUTPUT | grep -o "\[\]" | wc -l)

if [[ $CONSUMERS_STATUS ]]; then 
    EXIT_STATUS=1
    echo $CONSUMERS_STATUS
fi

if [[ $CONSUMERS_WITHOUT_MESSAGES != 5 ]]; then
    EXIT_STATUS=1
    # echo $CONSUMERS_WITHOUT_MESSAGES
    # echo $CONSUMERS_OUTPUT
fi

if [[ $EXIT_STATUS ]]; then
    echo
    echo " Result: OK"
    echo
else
    echo
    echo " Result: KO"
    echo
fi

CONSUMERS_OUTPUT=$(docker-compose down --volume)

exit $EXIT_STATUS