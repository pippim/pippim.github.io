---
layout:       post
title:        How can I count files with a particular extension, and the directories they are in?
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/1023474
type:         Answer
tags:         command-line bash scripts files find
created_date: 2018-04-09 23:37:17
edit_date:    2020-06-12 14:37:07
votes:        2
favorites:    
views:        7,770
accepted:     
uploaded:     2021-12-28 13:55:01
toc:          false
navigation:   false
clipboard:    false
---

Consider using the `locate` command which is much faster than `find` command.

## Running on test data

``` 
$ sudo updatedb # necessary if files in focus were added `cron` daily.
$ printf "Number Files: " && locate -0r "$PWD.*\.c$" | xargs -0 -I{} sh -c 'test ! -L "$1" && echo "regular file"' _  {} | wc -l &&  printf "Number Dirs.: " && locate -r "$PWD.*\.c$" | sed 's%/[^/]*$%/%' | uniq -cu | wc -l
Number Files: 29
Number Dirs.: 7

```

Thanks to Muru for his answer to help me through stripping symbolic links out of the file count in [Unix & Linux answer][1].

Thanks to Terdon for his answer of `$PWD` (not directed at me) in [Unix & Linux answer][2].

----------

## Original answer below referenced by comments

## Short Form:



``` bash
$ cd /
$ sudo updatedb
$ printf "Number Files: " && locate -cr "$PWD.*\.c$"
Number Files: 3523
$ printf "Number Dirs.: " && locate -r "$PWD.*\.c$" | sed 's%/[^/]*$%/%' | uniq -c | wc -l 
Number Dirs.: 648

```

- `sudo updatedb` Update database used by `locate` command if `.c` files were created today or if you've deleted `.c` files today.
- `locate -cr "$PWD.*\.c$"` locate all `.c` files in the current directory and it's children (`$PWD`). Instead of printing file names, and print count with `-c` argument. The `r` specifies regex instead of default `*pattern*` matching which can yield too many results.
- `locate -r "$PWD.*\.c$" | sed 's%/[^/]*$%/%' | uniq -c | wc -l`. Locate all `*.c` files in current directory and below. Remove file name with `sed` leaving only directory name. Count number of files in each directory using `uniq -c`. Count number of directories with `wc -l`.

## Start at current directory with one-liner

``` bash
$ cd /usr/src
$ printf "Number Files: " && locate -cr "$PWD.*\.c$" &&  printf "Number Dirs.: " && locate -r "$PWD.*\.c$" | sed 's%/[^/]*$%/%' | uniq -c | wc -l
Number Files: 3430
Number Dirs.: 624

```

Notice how file count and directory count have changed. I believe all users have the `/usr/src` directory and can run above commands with different counts depending on number of installed kernels.

## Long Form:

The long form includes the time so you can see how much faster `locate` is over `find`. Even if you have to run `sudo updatedb` it is many times faster than a single `find /`.

``` bash
───────────────────────────────────────────────────────────────────────────────────────────
rick@alien:~/Downloads$ sudo time updatedb
0.58user 1.32system 0:03.94elapsed 48%CPU (0avgtext+0avgdata 7568maxresident)k
48inputs+131920outputs (1major+3562minor)pagefaults 0swaps
───────────────────────────────────────────────────────────────────────────────────────────
rick@alien:~/Downloads$ time (printf "Number Files: " && locate -cr $PWD".*\.c$")
Number Files: 3523

real    0m0.775s
user    0m0.766s
sys     0m0.012s
───────────────────────────────────────────────────────────────────────────────────────────
rick@alien:~/Downloads$ time (printf "Number Dirs.: " && locate -r $PWD".*\.c$" | sed 's%/[^/]*$%/%' | uniq -c | wc -l) 
Number Dirs.: 648

real    0m0.778s
user    0m0.788s
sys     0m0.027s
───────────────────────────────────────────────────────────────────────────────────────────

```

**Note:** This is all files on **ALL** drives and partitions. ie we can search for Windows commands too:

``` bash
$ time (printf "Number Files: " && locate *.exe -c)
Number Files: 6541

real    0m0.946s
user    0m0.761s
sys     0m0.060s
───────────────────────────────────────────────────────────────────────────────────────────
rick@alien:~/Downloads$ time (printf "Number Dirs.: " && locate *.exe | sed 's%/[^/]*$%/%' | uniq -c | wc -l) 
Number Dirs.: 3394

real    0m0.942s
user    0m0.803s
sys     0m0.092s

```

I have three Windows 10 NTFS partitions automatically mounted in `/etc/fstab`. Be aware locate knows everything!

## Interesting Count:

``` bash
$ time (printf "Number Files: " && locate / -c &&  printf "Number Dirs.: " && locate / | sed 's%/[^/]*$%/%' | uniq -c | wc -l)
Number Files: 1637135
Number Dirs.: 286705

real    0m15.460s
user    0m13.471s
sys     0m2.786s

```

It takes 15 seconds to count 1,637,135 files in 286,705 directories. YMMV.

For a detailed breakdown on `locate` command's regex handling (appears not to be needed in this Q&A but used just in case) please read this: https://askubuntu.com/questions/33280/use-locate-under-some-specific-directory

Additional reading from recent articles:

- [Tecmint - 10 Useful ‘locate’ Command Practical Examples for Linux Newbies][3]
- [HowtoForge - Linux Locate Command for Beginners (8 Examples)][4]
- [Computer Hope - Linux locate command][5]


  [1]: https://unix.stackexchange.com/a/437175/200094
  [2]: http://$PWD%20variable:%20unix.stackexchange.com/a/188191/200094
  [3]: https://www.tecmint.com/linux-locate-command-practical-examples/
  [4]: https://www.howtoforge.com/linux-locate-command/
  [5]: https://www.computerhope.com/unix/ulocate.htm
