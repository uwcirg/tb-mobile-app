FROM node:8

ENV PATH /usr/lib/node_modules/.bin:$PATH

RUN npm install -g create-react-app \
                   create-react-native-app \
                   react-native-cli

RUN mkdir -p /usr/src/app
COPY ./app /usr/src/app

WORKDIR /usr/src/app/tbapp

# RUN yarn install

CMD bin/bash

#CMD yarn start

