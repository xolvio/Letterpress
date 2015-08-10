#!/usr/bin/env bash

#export VELOCITY_DEBUG=0

# these are about to get canned
export JASMINE_CLIENT_UNIT=0
export JASMINE_SERVER_UNIT=0

export JASMINE_CLIENT_INTEGRATION=1
export JASMINE_SERVER_INTEGRATION=1
export CUCUMBER=1

if [ "$1" = "--test" ]; then
  export CUCUMBER_TAIL=1;
fi

cd app
meteor $1 --settings ../environments/local/settings.json --release velocity:METEOR@1.1.0.3_2 --raw-logs
