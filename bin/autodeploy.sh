echo "Please input UW NetID"
read varname
ssh -t $varname@manganese.cirg.washington.edu "
sudo ls
cd /srv/www/tb-api-dev.cirg.washington.edu/tb-mobile-app
git checkout mocks
git pull
sudo docker-compose run --rm client yarn
sudo docker-compose run --rm client yarn build
sudo rm -rf /srv/www/tb-app.cirg.washington.edu/htdocs
sudo mv build /srv/www/tb-app.cirg.washington.edu/htdocs
"
