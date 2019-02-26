# TB Mobile App

Test Suite:
[![CircleCI](https://circleci.com/gh/uwcirg/tb-mobile-app.svg?style=svg)](https://circleci.com/gh/uwcirg/tb-mobile-app)

## Getting Started

To run this application on your local computer,
make sure you have `docker` and `docker-compose` installed.

Run `./bin/setup`.

You may be prompted for an administrator password,
depending on how Docker is set up on your computer.

If all goes well, your application will start up after a few minutes.
If not, please [open an issue] here on GitHub.

[open an issue]: https://github.com/uwcirg/tb-mobile-app/issues/new?title=Problem%20with%20setup%20script

- - -

## Security

Future versions of the Assemble platform
will require an RSA x.509 public/private keypair.

See
https://smartnets.wordpress.com/2017/04/27/create-certificate-chain-and-sign-certificates-using-openssl/
for implementation details,
or contact Assemble, LLC to obtain a valid certificate.
