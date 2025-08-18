---
layout:       post
title:        >
    Using global variables between files?
site:         Stack Overflow
stack_url:    https://stackoverflow.com/q/68278598
type:         Answer
tags:         python share global
created_date: 2021-07-07 00:05:03
edit_date:    
votes:        "2 "
favorites:    
views:        "510,834 "
accepted:     
uploaded:     2025-08-18 11:20:17
git_md_url:   https://github.com/pippim/pippim.github.io/blob/main/_posts/2021/2021-07-07-Using-global-variables-between-files_.md
toc:          false
navigation:   false
clipboard:    false
---

Based on above answers and links within I created a new module called `global_variables.py`:

``` python
#!/usr/bin/env python
# -*- coding: utf-8 -*-

# ==============================================================================
#
#       global_variables.py - Global variables shared by all modules.
#
# ==============================================================================

USER = None                 # User ID, Name, GUID varies by platform

def init():
    """ This should only be called once by the main module
        Child modules will inherit values. For example if they contain
        
            import global_variables as g
            
        Later on they can reference 'g.USER' to get the user ID.
    """
    global USER

    import getpass
    USER = getpass.getuser()

# End of global_variables.py

```

Then in my main module I use this:

``` 
import global_variables as g
g.init()
```

In another child imported module I can use:

``` 
import global_variables as g
# hundreds of lines later....
print(g.USER)
```


I've only spent a few minutes testing in two different python multiple-module programs but so far it's working perfectly.
