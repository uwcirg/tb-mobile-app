FROM node:8.16 as build-deps
ARG build_sha
ARG commit_time
WORKDIR /usr/src/app
COPY package.json yarn.lock ./
RUN yarn
COPY . ./
RUN REACT_APP_BUILD_NUMBER=$build_sha REACT_APP_COMMIT_TIME=$commit_time yarn build

FROM httpd:2.4
COPY ./.apache-config /usr/local/apache2/conf/httpd.conf
COPY --from=build-deps /usr/src/app/build /usr/local/apache2/htdocs/
COPY ./bin/docker-entrypoint.sh /docker-entrypoint.sh
COPY ./bin/generate-env.sh /generate-env.sh
RUN chmod +x /docker-entrypoint.sh /generate-env.sh
RUN ls /usr/sbin/

ENTRYPOINT ["/docker-entrypoint.sh"]
CMD ["httpd", "-D", "FOREGROUND"] 

