cd ..
cd ..
cd tb-foundation
pwd
docker build -t uwcirg/tb-foundation:demo .
cd ..
cd tb-mobile-app
docker-compose stop web
docker-compose rm -f web
docker-compose up -d
