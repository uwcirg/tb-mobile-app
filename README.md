# TB Mobile App

This software, developed under the direction of Sarah Iribarren
at the University of Washington,
is used to assist in a public-health study of Tuberculosis ([en], [es])
and the treatment outcomes of participants who carry the disease.

[en]: https://en.wikipedia.org/wiki/Tuberculosis
[es]: https://es.wikipedia.org/wiki/Tuberculosis

### Start

This software requires a host device with [Docker] configured and active.

On a bash command line, run:

```sh
> git clone https://github.com/uwcirg/tb-mobile-app.git
> ./bin/setup
```

You may be prompted for an administrator password,
depending on how Docker is set up on your device.

If all goes well, your application will start up after a few minutes;
you will be able to view the software in a web browser,
at the URL <http://localhost:3060>.

If not, please [open an issue] here on GitHub.

[Docker]: https://docs.docker.com/v17.12/install/
[open an issue]: https://github.com/uwcirg/tb-mobile-app/issues/new?title=Problem%20with%20setup%20script

### Query Data

This software is mostly built out of the web browser language Javascript.
It does require a small bundle of code running on the host device;
about one hundred lines of code total, stored in [./models].

The code packaged for the host device
defines the structure of the application's information,
as stored on the host device in a [PostgreSQL] database.

The code makes use of [ActiveRecord],
originally built to empower [Ruby on Rails] applications.
Comprehensive documentation and question/answer threads
are readily available online.

[ActiveRecord]: https://guides.rubyonrails.org/active_record_basics.html
[PostgreSQL]: https://www.postgresql.org/
[Ruby on Rails]: https://rubyonrails.org/
[./models]: ./models

### Encrypt Passwords

Passwords are encrypted before they are stored,
in order to safeguard against a database breach.

This project uses the Ruby library [bcrypt-ruby] to secure passwords.
password "digests" are computed and stored in the database fields:

* `participant.password_digest`
* `coordinator.password_digest`

Code for storing a password looks like:

```
participant.password_digest = BCrypt::Password.create("password")
```

Code to compare a stored password against an attempt looks like:

```
BCrypt::Password.new(password_digest) == "attempt"
```

[bcrypt-ruby]: https://github.com/codahale/bcrypt-ruby

### Save Information

It is important to take snapshots of the software's backing database
before any maintenance or operation that risks information erasure.

To save the database to a date-stamped file, run:

```
docker-compose exec db pg_dump -U postgres -F t development > $(date +'%C%y_%m_%d').backup
```

Restoring a database is a two-step process.
You must first place a copy of the backup file into the database container.
In this example, `tb_db_1` is the name of our database container.

```
docker cp restore.backup tb_db_1:/usr/src/restore.backup
docker-compose exec db psql -U postgres -d development -f /usr/src/restore.backup
```

### Manage

Finally, a useful list of commands to manage the software
can be found in the [./bin/deploy] script.
If your host or development device doesn't require `sudo`,
please leave it off of the commands.

Some of the commands in the file,
especially related to the Apache web server,
are specific to the University of Washington deployment under Sarah Iribarren.
General docker commands are expected to work in any environment.

[./bin/deploy]: ./bin/deploy
