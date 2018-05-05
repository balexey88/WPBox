# Project Name

The sites uses Vagrant Box as development environment.
VirtualBox's IP address is **IP Address**.
The Wordpress website is [http://hostname.dev/](http://hostname.dev/)

To view php info use [http://hostname.dev/info](http://hostname.dev/info)

### Apache log

Log files are located in `log/` subfolder.

### Database tools and features

Development database dumps are located in `db/` subfolder. To create a database dump right from your host machine:
- `tools/make_dump` will create the dump in `db/dump.sql`
- run `tools/import_dump` to import `db/dump.sql`

**MySQL** admin credentials are *root/root*. There is also a default MySQL *wp/wp* user account with an access to all databases.

**phpMyAdmin** is available on [http://hostname.dev/my](http://hostname.dev/my)
