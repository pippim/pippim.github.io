---
layout:       post
title:        >
    tkinter: How to serialize a treeview?
site:         Stack Overflow
stack_url:    https://stackoverflow.com/q/64185486
type:         Answer
tags:         python python-2.7 tkinter treeview pickle
created_date: 2020-10-03 14:48:59
edit_date:    
votes:        "0 "
favorites:    
views:        "1,570 "
accepted:     
uploaded:     2023-12-31 10:24:11
git_md_url:   https://github.com/pippim/pippim.github.io/blob/main/_posts/2020/2020-10-03-tkinter_-How-to-serialize-a-treeview_.md
toc:          false
navigation:   false
clipboard:    false
---

Another Q&A shows how to pickle a treeview on exit and reload it on startup:

- [How to save information from the program then use it to show in program again (simple programming)](How to save information from the program then use it to show in program again (simple programming))

The OP has information laid out thusly:

``` 
#----------TreeViewlist----------------------
Header =['Website','Username','Password','etc']
```

The gist of the treeview is a record of each website the OP visits, what user ID is used and the password used.

To summarize the accepted answer:

## Save treeview to pickle on exit

``` 
x=[tree.item(x)['values'] for x in tree.get_children()]
filehandler = open('data.pickle', 'wb')
pickle.dump(x,filehandler)
filehandler.close()
```

## Load pickle to build treeview on startup

``` 
items = []
try:
    filehandler = open('data.pickle', 'rb')
    items = pickle.load(filehandler)
    filehandler.close()
except:
    pass

for item in items:
    tree.insert('','end',values=item)
```

The answer appears straight forward (to me) but if you have any questions post a comment below. If you see a flaw or bug in the code post a comment in the link above.
