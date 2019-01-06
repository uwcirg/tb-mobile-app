# Apache configuration

Apache is a good tool for running the application with clean URLs.
These configurations are samples;
they may not work well in all situations.

To customize the behavior further,
read up on Apache virtual hosts.
[Apache virtual hosts]: https://www.digitalocean.com/community/tutorials/how-to-set-up-apache-virtual-hosts-on-ubuntu-14-04-lts

Make sure these ports and URLs match up with those configured in `.env`.

> Note!
> The numbers `3060` and `5061` in these samples are important;
> they correspond to the environment variables
> configured in the project's `.env`,
> and referenced by the project's `docker-compose.yml`.

Besides the ports `3060` and `5061`,
likely points for customization are:

* ServerName
* ErrorLog
* ProxyPass
* ProxyPassReverse
* SSLCertificateFile
* SSLCertificateKeyFile

We highly recommend setting up the site to work with SSL,
so those configurations are listed first.

## With SSL

Create two files:

```
/etc/apache2/sites-enabled/
  25-ssl-tb-mobile-dev.cirg.washington.edu.conf
  25-ssl-tb-api-dev.cirg.washington.edu.conf
```

The first configures Apache to open up the web client.

```apache
<VirtualHost *:443>
  ServerName tb-mobile-dev.cirg.washington.edu

  ## Logging
  ErrorLog "/var/log/apache2/ssl-tb-mobile-dev.cirg.washington.edu_error_ssl.log"
  ServerSignature Off
  CustomLog "/var/log/apache2/ssl-tb-mobile-dev.cirg.washington.edu_access_ssl.log" combined env=!dontlog

  ## Header rules
  ## as per http://httpd.apache.org/docs/2.2/mod/mod_headers.html#header
  Header add Strict-Transport-Security "max-age=15768000"
  ## Request header rules
  ## as per http://httpd.apache.org/docs/2.2/mod/mod_headers.html#requestheader
  RequestHeader set X-Forwarded-Proto "https"
  RequestHeader set X-Forwarded-Port  "443"

  ## Proxy rules  ProxyRequests Off
  ProxyPreserveHost On
  ProxyPass / http://127.0.0.1:3066/
  ProxyPassReverse / http://127.0.0.1:3066/

  ## SSL directives
  SSLEngine on
  SSLCertificateFile      "/etc/apache2/ssl/wildcard.cirg.washington.edu.crt.pem"
  SSLCertificateKeyFile   "/etc/apache2/ssl/wildcard.cirg.washington.edu.key.pem"
</VirtualHost>
```

The second configures Apache to open up the server.

```apache
<VirtualHost *:443>
  ServerName tb-api-dev.cirg.washington.edu

  ## Logging
  ErrorLog "/var/log/apache2/ssl-tb-api-dev.cirg.washington.edu_error_ssl.log"
  ServerSignature Off  CustomLog "/var/log/apache2/ssl-tb-api-dev.cirg.washington.edu_access_ssl.log" combined env=!dontlog

  ## Header rules
  ## as per http://httpd.apache.org/docs/2.2/mod/mod_headers.html#header
  Header add Strict-Transport-Security "max-age=15768000"

  ## Request header rules  ## as per http://httpd.apache.org/docs/2.2/mod/mod_headers.html#requestheader
  RequestHeader set X-Forwarded-Proto "https"
  RequestHeader set X-Forwarded-Port  "443"

  ## Proxy rules
  ProxyRequests Off
  ProxyPreserveHost On
  ProxyPass / http://127.0.0.1:8084/
  ProxyPassReverse / http://127.0.0.1:8084/

  ## Server aliases
  ServerAlias tb-api-docker.cirg.washington.edu

  ## SSL directives
  SSLEngine on
  SSLCertificateFile      "/etc/apache2/ssl/wildcard.cirg.washington.edu.crt.pem"
  SSLCertificateKeyFile   "/etc/apache2/ssl/wildcard.cirg.washington.edu.key.pem"
</VirtualHost>
```

## Redirect all traffic to SSL

Most web browsers will attempt to show a site over HTTP first,
and need to redirected to use a secure connection.

Create two additional files:

```
/etc/apache2/sites-enabled/
  25-tb-mobile-dev.cirg.washington.edu.conf
  25-tb-api-dev.cirg.washington.edu.conf
```

These use the `RewriteCond` and `RewriteRule` instructions to change all
`http://tb-mobile-dev.cirg.washington.edu` requests into `https://...` requests.


```apache
<VirtualHost *:80>
  ServerName tb-mobile-dev.cirg.washington.edu

  ## Logging
  ErrorLog "/var/log/apache2/tb-mobile-dev.cirg.washington.edu_error.log"
  ServerSignature Off  CustomLog "/var/log/apache2/tb-mobile-dev.cirg.washington.edu_access.log" combined env=!dontlog
  ## Rewrite rules
  RewriteEngine On

  #Allow metricbeat server-status, Lets Encrypt ACME Challenges
  RewriteCond %{REQUEST_URI} !^/server\-status
  RewriteCond %{REQUEST_URI} !^/\.well\-known/acme\-challenge/  RewriteRule (.*) https://%{HTTP_HOST}%{REQUEST_URI} [R=301,L]

</VirtualHost>
```

The second configuration file redirects unsecured traffic for
`http://tb-api-dev.cirg.washington.edu` to `https://...`, as well.


```apache
<VirtualHost *:80>
  ServerName tb-api-dev.cirg.washington.edu

  ## Logging
  ErrorLog "/var/log/apache2/tb-api-dev.cirg.washington.edu_error.log"
  ServerSignature Off  CustomLog "/var/log/apache2/tb-api-dev.cirg.washington.edu_access.log" combined env=!dontlog
  ## Rewrite rules
  RewriteEngine On

  #Allow metricbeat server-status, Lets Encrypt ACME Challenges
  RewriteCond %{REQUEST_URI} !^/server\-status
  RewriteCond %{REQUEST_URI} !^/\.well\-known/acme\-challenge/  RewriteRule (.*) https://%{HTTP_HOST}%{REQUEST_URI} [R=301,L]


  ## Server aliases
  ServerAlias tb-api-docker.cirg.washington.edu
</VirtualHost>
```
