#!/usr/bin/env bash
export JASMINE_CLIENT_INTEGRATION=0
export VELOCITY_TEST_PACKAGES=1
meteor --port 5000 test-packages --driver-package velocity:html-reporter ./
