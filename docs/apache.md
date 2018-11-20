## Apache configuration

Apache is a good tool for running the application with clean URLs.
These configurations are samples taken from an active production environment.

Make sure these ports and URLs match up with those configured in `.env`.

TB Mobile, SSL
`/etc/apache2/sites-enabled/25-ssl-tb-mobile-dev.cirg.washington.edu.conf`

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

TB Mobile, no SSL
`/etc/apache2/sites-enabled/25-tb-mobile-dev.cirg.washington.edu.conf`

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

Mpower, SSL
`/etc/apache2/sites-enabled/25-ssl-mpower-api-dev.cirg.washington.edu.conf`

```apache
<VirtualHost *:443>
  ServerName mpower-api-dev.cirg.washington.edu

  ## Logging
  ErrorLog "/var/log/apache2/ssl-mpower-api-dev.cirg.washington.edu_error_ssl.log"
  ServerSignature Off  CustomLog "/var/log/apache2/ssl-mpower-api-dev.cirg.washington.edu_access_ssl.log" combined env=!dontlog

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
  ServerAlias mpower-api-docker.cirg.washington.edu

  ## SSL directives
  SSLEngine on
  SSLCertificateFile      "/etc/apache2/ssl/wildcard.cirg.washington.edu.crt.pem"
  SSLCertificateKeyFile   "/etc/apache2/ssl/wildcard.cirg.washington.edu.key.pem"
</VirtualHost>
```

Mpower, no SSL
`/etc/apache2/sites-enabled/25-mpower-api-dev.cirg.washington.edu.conf`

```apache
<VirtualHost *:80>
  ServerName mpower-api-dev.cirg.washington.edu

  ## Logging
  ErrorLog "/var/log/apache2/mpower-api-dev.cirg.washington.edu_error.log"
  ServerSignature Off  CustomLog "/var/log/apache2/mpower-api-dev.cirg.washington.edu_access.log" combined env=!dontlog
  ## Rewrite rules
  RewriteEngine On

  #Allow metricbeat server-status, Lets Encrypt ACME Challenges
  RewriteCond %{REQUEST_URI} !^/server\-status
  RewriteCond %{REQUEST_URI} !^/\.well\-known/acme\-challenge/  RewriteRule (.*) https://%{HTTP_HOST}%{REQUEST_URI} [R=301,L]


  ## Server aliases
  ServerAlias mpower-api-docker.cirg.washington.edu
</VirtualHost>
```
