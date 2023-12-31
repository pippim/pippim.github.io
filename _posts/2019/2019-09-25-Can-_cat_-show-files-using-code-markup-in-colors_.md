---
layout:       post
title:        >
    Can `cat` show files using code markup in colors?
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/1176548
type:         Answer
tags:         colors cat
created_date: 2019-09-25 10:47:37
edit_date:    
votes:        "0 "
favorites:    
views:        "46,791 "
accepted:     
uploaded:     2023-12-31 10:24:11
git_md_url:   https://github.com/pippim/pippim.github.io/blob/main/_posts/2019/2019-09-25-Can-_cat_-show-files-using-code-markup-in-colors_.md
toc:          false
navigation:   false
clipboard:    false
---

Rather than installing a third party package, you can simply use `gedit` to quickly view a file with syntax highlighting. For example copy the address bar above and paste into your terminal:

``` 
gedit https://askubuntu.com/questions/405960/can-cat-show-files-using-code-markup-in-colors
```

You will see this question in HTML with formatted colors:

[![gedit https.png][1]][1]

- You can use familiar `gedit` navigation keys
- You can turn line wrap on/off
- You can use plugins like I have installed for 80 character gutter and document overview (far right) with thumbnail slider
- The only caveat is you need to remember <kbd>Alt</kbd>+<kbd>F4</kbd> to quickly close the window to simulate `cat` which doesn't require keystrokes to close.

  [1]: https://i.stack.imgur.com/ksYSZ.png
