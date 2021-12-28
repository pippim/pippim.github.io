---
layout:       post
title:        I cannot use MySql as normal user in Ubuntu 18.04
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/1045314
type:         Answer
tags:         server permissions mysql
created_date: 2018-06-10 14:44:30
edit_date:    2020-06-12 14:37:07
votes:        3
favorites:    
views:        6,411
accepted:     Accepted
uploaded:     2021-12-28 15:43:52
toc:          false
navigation:   false
clipboard:    false
---

From [this tutorial][1] you need to create a database and user to use mySQL.


## To create a MySQL database and user, follow these steps

At the command line, log in to MySQL as the root user:

``` 
mysql -u root -p

```

Type the MySQL root password, and then press Enter.

To create a database user, type the following command. Replace `username` with the user you want to create, and replace password with the user's password:

``` 
GRANT ALL PRIVILEGES ON *.* TO 'username'@'localhost' IDENTIFIED BY 'password';

```

This command grants the user all permissions. However, you can grant specific permissions to maintain precise control over database access. For example, to explicitly grant the `SELECT` permission, you would use the following command:

``` 
GRANT SELECT ON *.* TO 'username'@'localhost';

```

For more information about setting MySQL database permissions, please visit https://dev.mysql.com/doc/refman/5.5/en/grant.html.

Type `\q` to exit the mysql program.

To log in to MySQL as the user you just created, type the following command. Replace `username` with the name of the user you created above:

``` 
mysql -u username -p

```

Type the user's password, and then press Enter.

To create a database, type the following command. Replace `dbname` with the name of the database that you want to create:

``` 
CREATE DATABASE dbname;

```

To work with the new database, type the following command. Replace `dbname` with the name of the database you created above:

``` 
USE dbname;

```

You can now work with the database. For example, the following commands demonstrate how to create a basic table named example, and how to insert some data into it:

``` 
CREATE TABLE example ( id smallint unsigned not null auto_increment, name varchar(20) not null, constraint pk_example primary key (id) );
INSERT INTO example ( id, name ) VALUES ( null, 'Sample data' );

```

Much more can be found in the tutorial linked above such as:

- Creating SQL scripts
- Deleting tables and databases
- View a list of all users

## More Information

To view the official MySQL documentation, please visit https://dev.mysql.com/doc/refman/5.5/en/index.html.


  [1]: https://www.a2hosting.com/kb/developer-corner/mysql/managing-mysql-databases-and-users-from-the-command-line
