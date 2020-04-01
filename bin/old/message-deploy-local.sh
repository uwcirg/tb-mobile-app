cd ..
cd messaging-api
docker build -t kjgoodwins/message .
docker rm -f message
cd ..
docker-compose up -d

