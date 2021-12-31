---
layout:       post
title:        Bash builtin (not SED!) search and replace using octal values
site:         Stack Overflow
stack_url:    https://stackoverflow.com/q/43623085
type:         Question
tags:         arrays bash replace built-in
created_date: 2017-04-26 00:35:43
edit_date:    
votes:        0
favorites:    1
views:        251
accepted:     Accepted
uploaded:     2021-12-30 17:00:34
toc:          false
navigation:   false
clipboard:    false
---

I'm having problems getting my code to work:


``` 
for (( c=1; c<=$DirsArrCnt; c=c+$OneDirArrCnt )); do 
    # Replace every occurence of "/" (ASCII d47 o057) in path with "^A" (ASCII 1)
    Hold="${DirsArr[$c]}"
    DirsArr[c]="${Hold//\057/\001}"
done

```

Originally I skipped the Hold variable and used the array element directly but took that out thinking it was the problem.

Am I specifying the octal value correctly? I believe 57 is the octal value for "/" right?
