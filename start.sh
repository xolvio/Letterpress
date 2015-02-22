#!/bin/sh
#export JASMINE_BROWSER=PhantomJS

pkill -9 phantomjs;
pkill -9 node;

export JASMINE_CLIENT_UNIT=1
export JASMINE_CLIENT_INTEGRATION=1
export JASMINE_SERVER_UNIT=1
export JASMINE_SERVER_INTEGRATION=1

meteor reset
meteor --settings settings.json
