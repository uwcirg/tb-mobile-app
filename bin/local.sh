cd ..
cd tb-foundation
docker build -t kjgoodwins/foundation .
cd ..
cd tb-mobile-app
docker rm -f tb-mobile-app_web_1
docker rm -f tb-mobile-app_client_1
bin/setup
