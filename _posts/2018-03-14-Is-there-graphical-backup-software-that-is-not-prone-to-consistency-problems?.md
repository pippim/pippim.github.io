---
layout:       post
title:        Is there graphical backup software that is not prone to consistency problems?
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/1015022
type:         Answer
tags:         filesystem backup deja-dup
created_date: 2018-03-14 23:33:13
edit_date:    
votes:        2
favorites:    
views:        151
accepted:     
uploaded:     2021-12-28 13:55:01
toc:          false
navigation:   false
clipboard:    false
---

Unless you are a 24/7 shop generally speaking you have the server sign everyone off at say 2am and perform backups for two hours or whatever it takes. Usually this is done in conjunction with "End of Day Processing" which rolls up detail records to Master File records, closes Month Ends, Year Ends, etc.

The basic problem is some files will "change shape" if someone is adding or deleting records. Take for example ISAM (Indexed Sequential Access Method) files where there is a raw data file and then separate Index files for each key (ie Customer Number, Phone Number, etc.). If you were to say backup the Key file for Customer Numbers first, then a user added a new customer and you backed up the raw data file you would have a data integrity error.

SQL is the popular choice these days for databases in which case an SQL dump is performed without keys backed up I think. Learning SQL (pronounced Sea-Quill) has been on my to-do list for 30+ years.

Whatever your environment you have to study backup requirements carefully and test them periodically by restoring them to a test database.

Backing up programs is generally over-kill because they can be reinstalled. The exception being your own scripts you develop.

To reiterate the safest backups are those when all users are logged out of the system. When that can't be guaranteed then professional help should be sought.
