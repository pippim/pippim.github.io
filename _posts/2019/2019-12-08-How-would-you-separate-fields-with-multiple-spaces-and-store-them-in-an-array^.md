---
layout:       post
title:        >
    How would you separate fields with multiple spaces and store them in an array?
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/1194718
type:         Answer
tags:         bash sed awk cut-command tr
created_date: 2019-12-08 15:57:22
edit_date:    2019-12-09 11:55:37
votes:        "2 "
favorites:    
views:        "3,603 "
accepted:     
uploaded:     2022-01-14 05:39:48
git_md_url:   https://github.com/pippim/pippim.github.io/blob/main/_posts/2019/2019-12-08-How-would-you-separate-fields-with-multiple-spaces-and-store-them-in-an-array^.md
toc:          false
navigation:   false
clipboard:    true
---

This answer focuses on removing two heading lines from the array to match output requirements.

<!-- Language-all: lang-bash -->


``` 
$ cat fieldone.txt
field1                    field2
------                    -------
this are numbers          12345
this letters              abc def ghi 

$ fieldone
this are numbers         
this letters             
```

Here is the script:

{% include copyHeader.html %}
``` bash
#!/bin/bash

# NAME: fieldone
# PATH: $HOME/askubuntu/
# DESC: Answer for: https://askubuntu.com/questions/1194620/
# how-would-you-separate-fields-with-multiple-spaces-and-store-them-in-an-array

# DATE: December 8, 2019.

i=0                                     # Current 0-based array index number
while read line; do                     # Read all lines from input file
    ((LineNo++))                        # Current line number of input file
    [[ $LineNo -eq 1 ]] && continue     # "Field 1     Field 2" skip first line
    if [[ $LineNo -eq 2 ]] ; then       # Is this is line 2?
        # Grab the second column position explained in:
        # https://unix.stackexchange.com/questions/153339/
        # how-to-find-a-position-of-a-character-using-grep
        Len="$(grep -aob ' -' <<< "$line" | \grep -oE '[0-9]+')"
        continue                        # Loop back for first field
    fi

    field_one[$i]="${line:0:$Len}"      # Extract line position 0 for Len
    echo "${field_one[i]}"              # Display array index just added
    ((i++))                             # Increment for next array element

done < fieldone.txt                     # Input filename fed into read loop
```

Hopefully code and comments are self explanatory. If not don't hesitate to comment.

The script still works if only one space separates the two columns whereas some other answers will break:

``` 
field1         field2
------         ------
this is letter abcdef
this is number 123456
```
