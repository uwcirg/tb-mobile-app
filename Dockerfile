FROM node:10

ENV PATH /usr/lib/node_modules/.bin:$PATH

RUN mkdir -p /usr/src
COPY . /usr/src

WORKDIR /usr/src/

RUN yarn install
