#!/bin/bash
NB_OF_TESTS=4
EXIT_STATUS=0

echo "*** Local producer/consumer tests: ***"

for (( TEST=0 ; TEST<=2 ; TEST++ ));
do
    node regression.js $TEST
    if [ $? -eq 1 ]; then
        EXIT_STATUS=1
    fi    
done

if [ $EXIT_STATUS -eq 1 ]; then
    exit $EXIT_STATUS
fi    