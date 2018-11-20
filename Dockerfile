FROM node:10

ENV PATH /usr/lib/node_modules/.bin:$PATH

WORKDIR /usr/src/
ADD package.json yarn.lock /usr/src/
RUN yarn install

ADD . /usr/src/
