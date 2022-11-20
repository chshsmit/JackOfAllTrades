#!/bin/bash
docker build -t chshsmit/jackofalltrades .
docker stop jack_of_all_trades
docker rm jack_of_all_trades
docker image prune --filter="dangling=true" -f
docker run --name jack_of_all_trades -d chshsmit/jackofalltrades
