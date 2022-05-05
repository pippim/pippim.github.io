---
layout:       post
title:        >
    Can Gedit default highlighting style be set for files without an extension?
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/866679
type:         Answer
tags:         gedit mime-type
created_date: 2017-01-01 05:12:43
edit_date:    2017-01-01 08:06:54
votes:        "5 "
favorites:    
views:        "1,265 "
accepted:     Accepted
uploaded:     2022-05-05 04:52:17
git_md_url:   https://github.com/pippim/pippim.github.io/blob/main/_posts/2017/2017-01-01-Can-Gedit-default-highlighting-style-be-set-for-files-without-an-extension_.md
toc:          false
navigation:   false
clipboard:    false
---

### Steps taken

In my `gedit`, from the top bar menu, I select `View`, `Highlight mode...` and "Plain Text" is the default as shown below:

[![gedit highlight mode][1]][1]

Using the file name "test.sample" and pasting in a few lines of Matlab code it still stays as "Plain Text" format unless I force it to "Matlab" format.

After saving and exiting I performed `cp test.sample test.newbee` followed by `gedit test.newbee` the default format is still "Plain Text".

Next I created a new file using `gedit` called `noextention`. I typed a sentence, saved the new file and exited. Then I reopened the file using `gedit` and this is the result:

[![enter image description here][2]][2]

Notice the bottom bar of gedit's window shows `Plain Text` option for highlighting.

### Summary

This was done under Ubuntu 16.04, Kernel 4.4.0-53.

I can confirm that `<property name="globs">*.m</property>` exists within `/usr/share/gtksourceview-3.0/language-specs/matlab.lang`.

Because I can't break my system like yours, unless we find something on your system to fix, I suggest reinstalling `gedit` after removing and purging all it's files with `apt-get`.

Particulars about my version:

``` 
$ sudo apt install gedit
Reading package lists... Done
Building dependency tree       
Reading state information... Done
gedit is already the newest version (3.18.3-0ubuntu4).
0 upgraded, 0 newly installed, 0 to remove and 1 not upgraded.
```


  [1]: https://i.stack.imgur.com/2H8BY.png
  [2]: https://i.stack.imgur.com/IXCrw.png
