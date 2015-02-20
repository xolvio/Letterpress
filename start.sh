#!/bin/sh
#export JASMINE_BROWSER=PhantomJS

export JASMINE_CLIENT_UNIT=1
export JASMINE_CLIENT_INTEGRATION=1
export JASMINE_SERVER_UNIT=1
export JASMINE_SERVER_INTEGRATION=1

meteor --settings settings.json
