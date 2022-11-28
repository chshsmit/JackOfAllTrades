#!/bin/bash
# docker build -t chshsmit/jackofalltrades .
# docker stop jack_of_all_trades
# docker rm jack_of_all_trades
# docker image prune --filter="dangling=true" -f
# docker run --name jack_of_all_trades -d chshsmit/jackofalltrades

STAGE=PROD yarn deploy
pm2 kill
npx tsc
STAGE=PROD pm2 start .build/src/Bot.js