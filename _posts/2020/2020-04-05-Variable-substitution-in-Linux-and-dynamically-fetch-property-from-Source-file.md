---
layout:       post
title:        >
    Variable substitution in Linux and dynamically fetch property from Source file
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/1224349
type:         Answer
tags:         bash
created_date: 2020-04-05 15:17:04
edit_date:    
votes:        "2 "
favorites:    
views:        "0 "
accepted:     
uploaded:     2024-08-06 16:55:00
git_md_url:   https://github.com/pippim/pippim.github.io/blob/main/_posts/2020/2020-04-05-Variable-substitution-in-Linux-and-dynamically-fetch-property-from-Source-file.md
toc:          false
navigation:   false
clipboard:    false
---

This meets your criteria:

``` 
$ cat extract.dat
ExchgRate_prop="EDB_NAME=share_exchange SRC_WDS=wds PN=ExchgRate"
Compliance_prop="EDB_NAME=share_compliance SRC_WDS=wca PN=com"
Unitcost_prop=="EDB_NAME=share_unitcost SRC_WDS=wda PN=unit"

$ grep ExchgRate extract.dat | cut -d'"' -f2
EDB_NAME=share_exchange SRC_WDS=wds PN=ExchgRate

$ grep Unitcost extract.dat | cut -d'"' -f2
EDB_NAME=share_unitcost SRC_WDS=wda PN=unit
```

To make it easier you can create a script (note the path is for my system, not yours):

``` bash
#!/bin/bash

# NAME: extract.sh
# PATH: $HOME/askubuntu/
# DESC: Answer for: https://askubuntu.com/questions/1224345/variable-substitution-in-linux-and-dynamically-fetch-property-from-source-file
# PARM: $1 = input file, $2 = field name
# NOTE: Prints result
# DATE: April 5, 2020


grep "$2" "$1" | cut -d'"' -f2

```

Make the script executable with `chmod a+x extract.sh`.

Put the script in the path or call it in the current directory with:

``` 
$ extract.sh extract.dat Unitcost
EDB_NAME=share_unitcost SRC_WDS=wda PN=unit
```
