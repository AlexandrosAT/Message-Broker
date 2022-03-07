#!/bin/bash
#################################
#   Testing the result of having multiple producers
#################################

echo
echo "Multiple producers"
echo
EXIT_STATUS=0
PRODUCERS_OUTPUT=$(docker-compose up --build)
PRODUCERS_STATUS=$(echo $PRODUCERS_OUTPUT | grep "code 1")
PRODUCERS_SUCCESS=$(echo $PRODUCERS_OUTPUT | grep -o "'Success'" | wc -l)

if [[ $PRODUCERS_STATUS ]]; then 
    EXIT_STATUS=1
fi

# 500 messages sent from 6 producers = 3000 messages
if [[ $PRODUCERS_SUCCESS != 3000 ]]; then 
    EXIT_STATUS=1
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

PRODUCERS_OUTPUT=$(docker-compose down --volume)

exit $EXIT_STATUS