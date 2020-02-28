FROM node:8.16 as build-deps
WORKDIR /usr/src/app
COPY package.json yarn.lock ./
RUN yarn
COPY . ./
RUN yarn build

FROM httpd:2.4
COPY ./.apache-config /usr/local/apache2/conf/httpd.conf
COPY --from=build-deps /usr/src/app/build /usr/local/apache2/htdocs/