---
layout:       post
title:        >
    Updating content of a zenity window
site:         Stack Overflow
stack_url:    https://stackoverflow.com/q/51887111
type:         Answer
tags:         linux bash shell zenity yad
created_date: 2018-08-17 01:01:00
edit_date:    
votes:        "2 "
favorites:    
views:        "5,255 "
accepted:     
uploaded:     2024-08-26 05:22:34
git_md_url:   https://github.com/pippim/pippim.github.io/blob/main/_posts/2018/2018-08-17-Updating-content-of-a-zenity-window.md
toc:          false
navigation:   false
clipboard:    false
---

Seven years late but better than never. This [`yad` support forum][1] addresses the issue for some people:

> Re: [yad] Re: Can a yad window update itself? Exactly what Joe stated  
> but, you have to use:  

``` 
Child(yad -tail --> *.log --> Yad Parent(yad --text-info )
```

> displayed and auto scrolling. This is not possible with `zenity`. See  
> my below video:  

[https://www.youtube.com/watch?v=stPAWGXQyLY](https://www.youtube.com/watch?v=stPAWGXQyLY)



  [1]: https://groups.google.com/forum/#!topic/yad-common/gLnEIQEMXwg

