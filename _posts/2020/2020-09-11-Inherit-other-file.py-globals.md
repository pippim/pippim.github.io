---
layout:       post
title:        >
    Inherit other file.py globals
site:         Stack Overflow
stack_url:    https://stackoverflow.com/q/63839115
type:         Answer
tags:         python inheritance global
created_date: 2020-09-11 00:02:11
edit_date:    
votes:        "0 "
favorites:    
views:        "1,180 "
accepted:     
uploaded:     2023-12-31 10:24:11
git_md_url:   https://github.com/pippim/pippim.github.io/blob/main/_posts/2020/2020-09-11-Inherit-other-file.py-globals.md
toc:          false
navigation:   false
clipboard:    false
---

According to: 

- [How do I share global variables across modules? - python][1]

Inside `index.py` you would remove:

``` 
global test
```

Then you would change:

``` 
test = 'new Value' # Setting new value to project global
```

To:

``` 
globals.test = 'new Value' # Setting new value to project global
```

In `help.py` you would change:

``` 
print test # Should print out 'new Value', but it prints 'testValue'
```

To:

``` 
print globals.test # Should print out 'new Value', but it prints 'testValue'
```

I'm actually working on a similar project tonight so will comeback and confirm website's correctness later (although it makes sense it is correct).

It seems confirmed by this link:

- http://effbot.org/pyfaq/how-do-i-share-global-variables-across-modules.htm

As an aside I'm somewhat surprised stack overflow doesn't have an answer on this yet other than the too often occurring accepted answer of "You can't do that". I don't have `c++` experience like you do in comments. But I have used `c` and psuedo `c#` and having header files you include for global variables seems like a no-brainer and not something to be shunned. I do it in Linux `bash` all the time with `source config.sh`, etc.

  [1]: https://www.edureka.co/community/52900/how-do-i-share-global-variables-across-modules-python
