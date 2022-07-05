FROM node:14.17 as build-deps
ARG build_sha
ARG github_version
WORKDIR /usr/src/app
COPY package.json yarn.lock ./
RUN yarn
COPY . ./
RUN REACT_APP_BUILD_NUMBER=$build_sha \
REACT_APP_GITHUB_VERSION=$github_version \
REACT_APP_PAGE_TITLE="Asistente de Tratamiento" \ 
REACT_APP_MANIFEST_NAME="manifest.json" \
yarn build

FROM httpd:2.4
COPY ./.apache-config /usr/local/apache2/conf/httpd.conf
COPY --from=build-deps /usr/src/app/build /usr/local/apache2/htdocs/
COPY ./bin/docker-entrypoint.sh /docker-entrypoint.sh
COPY ./bin/generate-env.sh /generate-env.sh
RUN chmod +x /docker-entrypoint.sh /generate-env.sh
RUN ls /usr/sbin/

ENTRYPOINT ["/docker-entrypoint.sh"]
CMD ["httpd", "-D", "FOREGROUND"] 

