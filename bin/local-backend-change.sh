cd ..
cd ..
cd tb-foundation
pwd
docker build -t kjgoodwins/foundation .
cd ..
cd tb-mobile-app
docker-compose stop web
docker-compose rm -f web
docker-compose up -d
