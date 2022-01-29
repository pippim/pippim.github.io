---
layout:       post
title:        >
    List all IP addresses in files on my computer?
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/1023189
type:         Answer
tags:         command-line text-processing ip
created_date: 2018-04-09 00:12:10
edit_date:    2020-06-12 14:37:07
votes:        "2 "
favorites:    
views:        "1,919 "
accepted:     Accepted
uploaded:     2022-01-29 14:37:33
git_md_url:   https://github.com/pippim/pippim.github.io/blob/main/_posts/2018/2018-04-09-List-all-IP-addresses-in-files-on-my-computer_.md
toc:          false
navigation:   false
clipboard:    false
---

# Use `grep`

You can use `grep` to find all files containing something that looks like an IPv4 IP address. Be aware there will be false positives. For example the file:

``` 
/usr/src/linux-headers-4.14.30-041430/include/linux/oid_registry.h
```

at line 48 will contain:

``` 
OID_smimeAuthenticatedAttrs,    /* 1.2.840.113549.1.9.16.2.11 */
```

It sort of looks like an IP address in the comments but it is not.

Initially start with a count of all the lines containing an IP address on your system:

``` 
$ sudo time grep -rnwI --exclude-dir={boot,dev,media,mnt,lib,proc,root,run,sys,/tmp,tmpfs,var} -E "([0-9]{1,3}[\.]){3}[0-9]{1,3}" / | wc
27.76user 13.17system 1:31.06elapsed 44%CPU (0avgtext+0avgdata 10416maxresident)k
12451744inputs+0outputs (2major+2098minor)pagefaults 0swaps
  17164  122083 3138285
```

Let's break down the commands

- `sudo` prevents "Permission denied" errors
- `time` tells us how long it takes to run, ie. 1 minute 31 seconds
- `grep` is the command that searches for strings in files
- `-rnwI` are the arguments (aka parameters) passed to `grep`. The `r` means recursive meaning sub-directories are processed. The `n` argument prints the line number the search string occurs in the file. The `I` argument tells it to ignore binary files. If binary files were include the number of files would increase from 17,164 to 22,253 on my system. You can't open binary files and make any sense of them though.
- `-exclude-dir=` are the directories to exclude from the search. Without this list `grep` can take 53 hours to complete: [`grep`ing all files for a string takes a long time][1]
- `-E` is the argument to `grep` that tells it the search string is about to follow.
- `"([0-9]{1,3}[\.]){3}[0-9]{1,3}"` is the search string to look forward. Explained in more detail below.
- `/` tells `grep` to start at the root directory. However the excluded directories will be skipped.
- `|` is the pipe command sending all output to the `wc` command instead of the screen.
- `wc` is the "word count" command. It counts the number lines, number of words and number of characters passed to it. In our case it is `17164` lines, `122,083` words and `3,138,285` characters. Commas added for clarity.


----------

## Breaking down `"([0-9]{1,3}[\.]){3}[0-9]{1,3}"`

As shown earlier, the search string passed to `grep` is `"([0-9]{1,3}[\.]){3}[0-9]{1,3}"`. Here is how it works:

``` 
"([0-9]{1,3}[\.]){3}[0-9]{1,3}"
    ^    ^   ^    ^   ^    ^
    |    |   |    |   |    +---- count of digits must be 1 to 3 
    |    |   |    |   +--------- look for digits 0 through 9
    |    |   |    +------------- patterns 1 to 3 digits of 0-9 followed by . occurs 3 times
    |    |   +------------------ count of 1 to 3 digits must be followed by .
    |    +---------------------- count of digits is 1 to 3
    +--------------------------- look for digits 0 to 9
## ```




## Seeing the output instead of word count

To see the actual output instead of just the word count remove `| wc` from the end of the command line:

``` 
$ sudo time grep -rnwI --exclude-dir={boot,dev,media,mnt,lib,proc,root,run,sys,/tmp,tmpfs,var} -E "([0-9]{1,3}[\.]){3}[0-9]{1,3}" /

    (... SNIP ...)
/usr/bin/printer-profile:176:   OUT="nc 192.168.1.12 9100 < xxx.prn"
/opt/google/chrome/default_apps/external_extensions.json:23:    "external_version": "0.0.0.6"
/opt/google/chrome/product_logo_32.xpm:330:"    [.}.}.|.1.2.3.4.5.6.7.8.9.0.a.b.8.c.d.e.f.g.h.h.i.j.k.l.    ",
28.52user 12.54system 1:31.78elapsed 44%CPU (0avgtext+0avgdata 9516maxresident)k
12793352inputs+0outputs (3major+1884minor)pagefaults 0swaps
```

The listing is too long to fit in this answer. Note the last file found is a false positive: 

``` 
/opt/google/chrome/product_logo_32.xpm
```

because it doesn't contain a real IP address:

``` 
[.}.}.|.1.2.3.4.5.6.7.8.9.0.a.b.8.c.d.e.f.g.h.h.i.j.k.l.
```

## Restrict your search to `/etc` directory at first

To narrow down search to more meaningful short-list use:

``` 
$ sudo time grep -rnI -E "([0-9]{1,3}[\.]){3}[0-9]{1,3}" /etc/etc/hosts:1:127.0.0.1 localhost
/etc/hosts:2:127.0.1.1  alien
/etc/cron.daily/google-earth:47:Version: GnuPG v1.4.2.2 (GNU/Linux)
    (... SNIP ...)
/etc/cups/cups-browsed.conf:77:# BrowseDeny 192.168.1.13
/etc/cups/cups-browsed.conf:78:# BrowseDeny 192.168.3.0/24
/etc/cups/cups-browsed.conf:79:# BrowseDeny 192.168.3.0/255.255.255.0
0.04user 0.03system 0:00.19elapsed 40%CPU (0avgtext+0avgdata 2800maxresident)k
22384inputs+0outputs (1major+181minor)pagefaults 0swaps
```

  [1]: {% post_url /2018/2018-02-12-`grep`ing-all-files-for-a-string-takes-a-long-time %}




