---
layout:       post
title:        >
    Confused about stdin, stdout and stderr?
site:         Stack Overflow
stack_url:    https://stackoverflow.com/q/63930028
type:         Answer
tags:         linux stdout stdin stderr
created_date: 2020-09-17 01:31:13
edit_date:    
votes:        "0 "
favorites:    
views:        "342,041 "
accepted:     
uploaded:     2023-12-31 10:24:11
git_md_url:   https://github.com/pippim/pippim.github.io/blob/main/_posts/2020/2020-09-17-Confused-about-stdin_-stdout-and-stderr_.md
toc:          false
navigation:   false
clipboard:    false
---

Here is a lengthy article on `stdin`, `stdout` and `stderr`:

- [What Are stdin, stdout, and stderr on Linux?][1]

To summarize:

> Streams Are Handled Like Files  
>   
> Streams in Linux—like almost everything else—are treated as though  
> they were files. You can read text from a file, and you can write text  
> into a file. Both of these actions involve a stream of data. So the  
> concept of handling a stream of data as a file isn’t that much of a  
> stretch.  
>   
> Each file associated with a process is allocated a unique number to  
> identify it. This is known as the file descriptor. Whenever an action  
> is required to be performed on a file, the file descriptor is used to  
> identify the file.  
>   
> These values are always used for stdin, stdout, and stderr:  
>   
>     0: stdin  
>     1: stdout  
>     2: stderr  

Ironically I found this question on stack overflow and the article above because I was searching for information on abnormal / non-standard streams. So my search continues.

  [1]: https://www.howtogeek.com/435903/what-are-stdin-stdout-and-stderr-on-linux/
