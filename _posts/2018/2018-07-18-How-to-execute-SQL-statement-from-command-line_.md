---
layout:       post
title:        >
    How to execute SQL statement from command line?
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/1057396
type:         Answer
tags:         command-line postgresql sql
created_date: 2018-07-18 22:33:14
edit_date:    2018-07-18 22:46:30
votes:        "1 "
favorites:    
views:        "86,591 "
accepted:     
uploaded:     2023-12-31 10:24:11
git_md_url:   https://github.com/pippim/pippim.github.io/blob/main/_posts/2018/2018-07-18-How-to-execute-SQL-statement-from-command-line_.md
toc:          false
navigation:   false
clipboard:    false
---

You can issue commands from the terminal, but you can get an [open source package][1] with tab completion, colours, etc:

[![enter image description here][2]][2]


----------

Using the generic program [psql][3] use:

``` 
$ psql mydb
```

If you leave off the database name then it will default to your user account name. You already discovered this scheme in the previous section.

In psql, you will be greeted with the following message:

``` 
Welcome to psql 8.3.23, the PostgreSQL interactive terminal.
 
Type:  \copyright for distribution terms
       \h for help with SQL commands
       \? for help with psql commands
       \g or terminate with semicolon to execute query
       \q to quit
 
mydb=>
```

The last line printed out by psql is the prompt, and it indicates that psql is listening to you and that you can type SQL queries into a work space maintained by psql. Try out these commands:

``` 
mydb=> SELECT version();
                            version
----------------------------------------------------------------
 PostgreSQL 8.3.23 on i586-pc-linux-gnu, compiled by GCC 2.96
(1 row)

mydb=> SELECT current_date;
    date
------------
 2002-08-31
(1 row)

mydb=> SELECT 2 + 2;
 ?column?
----------
        4
(1 row)
```

  [1]: https://www.pgcli.com/
  [2]: https://i.stack.imgur.com/5nAOP.png
  [3]: https://www.postgresql.org/docs/8.3/static/tutorial-accessdb.html


