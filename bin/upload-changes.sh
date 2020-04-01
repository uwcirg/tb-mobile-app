docker build -t uwcirg/tb-mobile-app:demo ../.
docker push uwcirg/tb-mobile-app:demo
docker build -t uwcirg/tb-foundation:demo ../../tb-foundation/.
docker push uwcirg/tb-foundation:demo