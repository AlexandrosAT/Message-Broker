#!/bin/bash
pretty_print () {
    echo
    echo \*\*\*
    echo $1
    echo \*\*\*
    echo
}

exit_code_check () {
    if [ $? -eq 1 ]; then
        TEST_STATUS=1
    fi
}

show_help (){
	printf "This is the broker testing script, no arguments are required\n"
}
if [[ $1 == "help" ]]; then 
    show_help
else
    TEST_STATUS=0
    pretty_print "Initializing broker"

    cd ..
    DOCKER_OUTPUT=$(docker-compose up -d --build)

    pretty_print "Initialization completed" 
    sleep 2

    cd tests/curlTests

    pretty_print "Executing curl tests"
    ./curlCalls.sh
    exit_code_check $?

    cd ../singleImageTests

    pretty_print "Executing regression localy"
    ./execute.sh
    exit_code_check $?

    pretty_print "Executing multiple dockerized producers/consumers"
    
    cd ../producerTests
    ./spawnProducers.sh 
    exit_code_check $?

    cd ../consumerTests
    ./spawnConsumers.sh 
    exit_code_check $?


    if [[ TEST_STATUS -eq 0 ]]; then
        pretty_print "Tests run successfully"
    else
        pretty_print "Tests failed"
    fi

    pretty_print "Terminating broker"
    docker-compose down --volumes
fi