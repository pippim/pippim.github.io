---
layout:       post
title:        >
    Shorten SQLite3 insert statement for efficiency and readability
site:         Stack Overflow
stack_url:    https://stackoverflow.com/q/66056368
type:         Question
tags:         python sqlite sql-insert
created_date: 2021-02-05 01:33:01
edit_date:    
votes:        "0 "
favorites:    
views:        "34 "
accepted:     Accepted
uploaded:     2022-01-01 10:05:50
toc:          false
navigation:   false
clipboard:    false
---

From this [answer][1]:

``` 
cursor.execute("INSERT INTO booking_meeting (room_name,from_date,to_date,no_seat,projector,video,created_date,location_name) VALUES (?, ?, ?, ?, ?, ?, ?, ?)", (rname, from_date, to_date, seat, projector, video, now, location_name ))

```

I'd like to shorten it to something like:

``` 
simple_insert(booking_meeting, rname, from_date, to_date, seat, projector, video, now, location_name)

```

The first parameter is the table name which can be read to get list of column names to format the first section of the SQLite3 statement:

``` 
cursor.execute("INSERT INTO booking_meeting (room_name,from_date,to_date,no_seat,projector,video,created_date,location_name)

```

Then the values clause (second part of the insert statement):

``` 
VALUES (?, ?, ?, ?, ?, ?, ?, ?)"

```

can be formatted by counting the number of column names in the table.

I hope I explained the question properly and you can appreciate the time savings of such a function. How to write this function in python? ...is my question.

There may already a `simple_insert()` function in SQLite3 but I just haven't stumbled across it yet.

  [1]: https://stackoverflow.com/a/45407876/6929343
