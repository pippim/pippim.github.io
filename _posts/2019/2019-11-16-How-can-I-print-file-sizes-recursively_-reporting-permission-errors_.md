---
layout:       post
title:        >
    How can I print file sizes recursively, reporting permission errors?
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/1189388
type:         Answer
tags:         permissions scripts files directory
created_date: 2019-11-16 20:28:07
edit_date:    2020-06-12 14:37:07
votes:        "0 "
favorites:    
views:        "446 "
accepted:     
uploaded:     2023-12-31 10:24:11
git_md_url:   https://github.com/pippim/pippim.github.io/blob/main/_posts/2019/2019-11-16-How-can-I-print-file-sizes-recursively_-reporting-permission-errors_.md
toc:          false
navigation:   false
clipboard:    false
---

As mentioned in comment `find` and `printf` are your friends on this homework assignment. For a one-liner use:

``` 
find /etc -name "*.conf" -printf "%s %p\n" 1>namesize.txt 2>errors.txt
```

To test the components with output to your screen try out the examples below.

``` 
$ find /etc -name "*.conf" 1>/dev/null
find: ‘/etc/ssmtp’: Permission denied
find: ‘/etc/polkit-1/localauthority’: Permission denied
find: ‘/etc/cups/ssl’: Permission denied
find: ‘/etc/ssl/private’: Permission denied
```

This is the short one that shows permission denied. Regular output is redirected to `/dev/null` (nowhere) so you get to see only the error messges.

``` 
$ find /etc -name "*.conf" -printf "%s %p\n" 2>/dev/null | column -t
3874   /etc/bluetooth/main.conf
258    /etc/bluetooth/proximity.conf
397    /etc/bluetooth/input.conf
  (... SNIP ...)
1366   /etc/at-spi2/accessibility.conf
13592  /etc/openal/alsoft.conf
1800   /etc/cracklib/cracklib.conf
```

This shows the the list of filenamnes and sizes which is too long to print entirely. The four error messages for "Permission denied" are filtered out with `2>/dev/null` redirecting all errors to "nowhere".

Output is piped (using `|`) to the `column -t` command which pads spaces behind the file sizes in order for the filenames to align in the output.

----------

## Compare links to [other answer][1]

The other answer shows links like this:

``` 
$ find -L /etc -type f -name '*.conf' -fprintf ~/filelist '%s %p\n' 2> ~/error.log
$ grep 45-latin.conf ~/filelist | column -t
4621  /etc/fonts/conf.d/45-latin.conf
4621  /etc/fonts/conf.avail/45-latin.conf
```


The size of the link inherits the size of the file it points to.

My answer shows links like this:

``` 
$ find /etc -name "*.conf" -printf "%s %p\n" 1>namesize.txt 2>errors.txt
$ grep 45-latin.conf namesize.txt | column -t
27    /etc/fonts/conf.d/45-latin.conf
4621  /etc/fonts/conf.avail/45-latin.conf
```

The size of the link is the real size of the link (27 bytes).

So it's a question of how your professor/TA/teacher wishes to links reported in the answer. The homework/Lab assignment should have been more specific on how to handle such intricacies of Linux.

To look at the link use:

``` 
$ ll /etc/fonts/conf.d/45-latin.conf
lrwxrwxrwx 1 root root 27 Aug  2  2018 /etc/fonts/conf.d/45-latin.conf -> ../conf.avail/45-latin.conf
```

  [1]: https://askubuntu.com/a/1189508/307523



