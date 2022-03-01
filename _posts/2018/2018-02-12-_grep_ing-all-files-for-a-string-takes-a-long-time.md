---
layout:       post
title:        >
    `grep`ing all files for a string takes a long time
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/1005438
type:         Answer
tags:         command-line performance search grep
created_date: 2018-02-12 12:08:35
edit_date:    2018-02-17 19:12:35
votes:        "16 "
favorites:    
views:        "4,860 "
accepted:     Accepted
uploaded:     2022-02-28 18:40:03
git_md_url:   https://github.com/pippim/pippim.github.io/blob/main/_posts/2018/2018-02-12-_grep_ing-all-files-for-a-string-takes-a-long-time.md
toc:          true
navigation:   true
clipboard:    false
---


<a id="hdr1"></a>
<div class="hdr-bar">  <a href="#hdr2">ToC</a>  <a href="#hdr2">Skip</a></div>

## Exclude virtual file systems

Looking at the sample output log we see virtual file systems are included in the search which is an unnecessary waste of time. Drop these and other directories from the search with the `--exclude-dir` option. For example:

``` 
sudo time grep -rnw --exclude-dir={boot,dev,lib,media,mnt,proc,root,run,sys,/tmp,tmpfs,var} '/' -e 'Sony 50"'
```

When `grep` parses the `/proc` directory chain it is uselessly looking at all the process ID's which takes more than a day in my case.

Also when processing `/mnt` it will be looking at mounted Windows NTFS drives and USBs unnecessarily.

`/media` is holds the CD/DVD drive and external usb drives.


<a id="hdr2"></a>
<div class="hdr-bar">  <a href="#">Top</a>  <a href="#hdr1">ToS</a>  <a href="#hdr3">Skip</a></div>

{% include toc.md %}


<a id="hdr3"></a>
<div class="hdr-bar">  <a href="#">Top</a>  <a href="#hdr2">ToS</a>  <a href="#hdr2">ToC</a>  <a href="#hdr4">Skip</a></div>

## Output:

``` 
$ sudo time grep -rnw --exclude-dir={boot,dev,lib,media,mnt,proc,root,run,sys,/tmp,tmpfs,var} '/' -e 'Sony 50"'
Binary file /home/Me/.config/google-chrome/Default/Sync Data/SyncData.sqlite3 matches
11.35user 13.83system 0:56.35elapsed 44%CPU (0avgtext+0avgdata 8480maxresident)k
17369032inputs+0outputs (0major+1620minor)pagefaults 0swaps
```

There you go **56 Seconds** instead of **50 Hours**!

Note if you exclude `usr` (containing 6.5 GB of files in in my case) from the search it is only 8 seconds:

``` 
4.48user 1.80system 0:08.75elapsed 71%CPU (0avgtext+0avgdata 6012maxresident)k
13008964inputs+0outputs (0major+1180minor)pagefaults 0swaps
```


<a id="hdr4"></a>
<div class="hdr-bar">  <a href="#">Top</a>  <a href="#hdr3">ToS</a>  <a href="#hdr2">ToC</a>  <a href="#hdr5">Skip</a></div>

## Interesting Notes

Keeping out the system directories seems to keep `grep` on better track and it never hits 100% CPU on a single core. Plus the hard disk light flashes constantly so you know `grep` is really working and not "thinking in circles".

If you don't prefix `tmp` with `/` then it will ignore any sub-directory containing `tmp` for example `/home/Me/tmp`. If you use --exclude-dir `/tmp` then your directory `/home/Me/tmp` will be searched.

If on the other hand you prefix `sys` with `/` then then `/sys` directory is searched and errors are reported. The same is true for `/proc`. So you have to use `sys,proc` and not prefix them with `/`. The same is true for other system directories I tested.

## Create alias `grepall`

Consider setting up an alias in `~/.bashrc` so you don't have to type the `--exclude-dir` parameter list every time:

``` 
alias grepall="grep --exclude-dir={boot,dev,lib,media,mnt,proc,root,run,sys,/tmp,tmpfs,var}"
```


----------



<a id="hdr5"></a>
<div class="hdr-bar">  <a href="#">Top</a>  <a href="#hdr4">ToS</a>  <a href="#hdr2">ToC</a>  <a href="#hdr6">Skip</a></div>

# Detailed time breakdown

This section breaks down how much time is saved by incrementally adding directories to the `--exclude-dir` parameter list:

- `/proc` and `/sys` saving **52 hours**
- `/media` saving **3 minutes**
- `/mnt` saving **21 minutes**
- `/usr/src` (by specifying `src`) saving **53 seconds**
- `/lib/modules` (by specifying `modules`) saving **39 seconds**

## Exclude `/proc` and `/sys` directories

The `/proc` and `/sys` directories are the most time consuming, the most useless to search and generate the most errors. It's "useless" because these two directories are dynamically created at run-time and don't contain permanent files you would want to `grep`.

A great time savings is realize by excluding them:

``` 
$ sudo time grep -rnw --exclude-dir={proc,sys} '/' -e 'Garbage 098jfsd'
/var/log/auth.log:4653:Feb 16 17:46:20 alien sudo:     rick : TTY=pts/18 ; PWD=/home/rick/Downloads ; USER=root ; COMMAND=/usr/bin/time grep -rnw --exclude-dir=proc --exclude-dir=sys / -e Garbage 098jfsd
Binary file /var/log/journal/d7b25a27fe064cadb75a2f2f6ca7764e/system.journal matches
grep: /media/rick/S3A6550D005/hiberfil.sys: Input/output error
      (... SNIP ...)
grep: /media/rick/S3A6550D005/winproductkey: Input/output error
grep: /run/user/1000/gvfs: Permission denied
Command exited with non-zero status 2
422.43user 112.91system 26:59.03elapsed 33%CPU (0avgtext+0avgdata 31152maxresident)k
379671064inputs+0outputs (1major+10738minor)pagefaults 0swaps
```

Only **27 Minutes** this time saving over **52 Hours**!

There are still errors though. In `/var` directory which is also a "virtual directory" created at run time. The `/run` directory which contains an Android Cell Phone and the `/media` directory which contains an old broken laptop hard drive now connected to an USB external HDD enclosure.


<a id="hdr6"></a>
<div class="hdr-bar">  <a href="#">Top</a>  <a href="#hdr5">ToS</a>  <a href="#hdr2">ToC</a>  <a href="#hdr7">Skip</a></div>

## Add `/media` to exclude list

The `/media` directory contains an old laptop drive connected via USB 3.0 port. Smartctl daily reports errors on the drive and doesn't have files we are looking for. We'll exclude it to save time and reduce error messages:

``` 
$ sudo time grep -rnw --exclude-dir={proc,sys,media} '/' -e 'Garbage 654asdf'
/var/log/auth.log:4664:Feb 16 18:26:27 alien sudo:     rick : TTY=pts/18 ; PWD=/home/rick/Downloads ; USER=root ; COMMAND=/usr/bin/time grep -rnw --exclude-dir=proc --exclude-dir=sys --exclude-dir=media / -e Garbage 654asdf
Binary file /var/log/journal/d7b25a27fe064cadb75a2f2f6ca7764e/system.journal matches
grep: /run/user/1000/gvfs: Permission denied
Command exited with non-zero status 2
405.51user 105.38system 23:26.89elapsed 36%CPU (0avgtext+0avgdata 30908maxresident)k
365800875inputs+0outputs (0major+10961minor)pagefaults 0swaps
```

Excluding the faulty hard drive connected via USB 3.0 enclosure only saved 3 minutes but reduced error messages.


<a id="hdr7"></a>
<div class="hdr-bar">  <a href="#">Top</a>  <a href="#hdr6">ToS</a>  <a href="#hdr2">ToC</a>  <a href="#hdr8">Skip</a></div>

## Add `/mnt` (Windows NTFS partitions) to exclude list

The `/mnt` directory contains:

- Two NTFS Windows 10 partitions (`C:` and `E:`) on an SSD with 105 GiB of data
- One NTFS Windows 10 partition (`D:`) on an HDD with 42 GiB of data

There is nothing of interest in Windows so we'll exclude `/mnt` to save time:

``` 
$ ll /mnt
total 44
drwxr-xr-x  5 root root  4096 Nov 12 07:19 ./
drwxr-xr-x 27 root root  4096 Feb 15 20:43 ../
drwxrwxrwx  1 root root  8192 Dec 30 14:00 c/
drwxrwxrwx  1 root root  8192 Dec 30 14:31 d/
drwxrwxrwx  1 root root 20480 Jan  1 13:22 e/

$ sudo time grep -rnw --exclude-dir={proc,sys,media,mnt} '/' -e 'Garbage zx5cv7er'
/var/log/auth.log:5093:Feb 17 10:31:44 alien sudo:     rick : TTY=pts/18 ; PWD=/home/rick/Downloads ; USER=root ; COMMAND=/usr/bin/time grep -rnw --exclude-dir=proc --exclude-dir=sys --exclude-dir=media --exclude-dir=mnt / -e Garbage zx5cv7er
Binary file /var/log/journal/d7b25a27fe064cadb75a2f2f6ca7764e/system.journal matches
grep: /run/user/1000/gvfs: Permission denied
Command exited with non-zero status 2
51.50user 23.28system 2:08.85elapsed 58%CPU (0avgtext+0avgdata 15800maxresident)k
39866258inputs+0outputs (0major+6059minor)pagefaults 0swaps
```

Now `grep` only takes 2 minutes and 8 seconds. By excluding Windows 10 partitions with 147 Gib of Programs and Data **saves 21.5 minutes!**


<a id="hdr8"></a>
<div class="hdr-bar">  <a href="#">Top</a>  <a href="#hdr7">ToS</a>  <a href="#hdr2">ToC</a>  <a href="#hdr9">Skip</a></div>

## Add `/usr/src` Linux Headers to exclude list

The `/usr/src` directory contains Linux Headers source code. In my case there are 20+ kernels manually installed which takes considerable space. To specify the directory though the argument used is `src`:

``` 
$ du -h -s /usr/src
3.2G	/usr/src

$ sudo time grep -rnw --exclude-dir={proc,sys,media,mnt,src} '/' -e 'Garbage z5cv7er'
/var/log/auth.log:5096:Feb 17 10:34:28 alien sudo:     rick : TTY=pts/18 ; PWD=/home/rick/Downloads ; USER=root ; COMMAND=/usr/bin/time grep -rnw --exclude-dir=proc --exclude-dir=sys --exclude-dir=media --exclude-dir=mnt --exclude-dir=src / -e Garbage z5cv7er
Binary file /var/log/journal/d7b25a27fe064cadb75a2f2f6ca7764e/system.journal matches
grep: /run/user/1000/gvfs: Permission denied
Command exited with non-zero status 2
44.21user 8.54system 1:15.51elapsed 69%CPU (0avgtext+0avgdata 15864maxresident)k
33754180inputs+0outputs (0major+6062minor)pagefaults 0swaps
```

Now grep is only taking 1 minutes and 15 seconds. Excluding `/usr/src` by specifying `src` on the `--exclude-dir` list saves 53 seconds.


<a id="hdr9"></a>
<div class="hdr-bar">  <a href="#">Top</a>  <a href="#hdr8">ToS</a>  <a href="#hdr2">ToC</a>  <a href="#hdr10">Skip</a></div>

## Add `/lib/modules` Kernel modules to exclude list

The `/lib/modules` directory contains compiled Kernel Modules. To specify the directory though the argument used is `modules`:

``` 
$ du -h -d1 /lib/modules
285M	/lib/modules/4.14.18-041418-generic
282M	/lib/modules/4.14.14-041414-generic
     (... SNIP ...)
228M	/lib/modules/4.9.76-040976-generic
6.0G	/lib/modules

$ sudo time grep -rnw --exclude-dir={proc,sys,media,mnt,src,modules} '/' -e 'Garbage 1cv7fer'
/var/log/auth.log:5117:Feb 17 11:07:41 alien sudo:     rick : TTY=pts/18 ; PWD=/home/rick/Downloads ; USER=root ; COMMAND=/usr/bin/time grep -rnw --exclude-dir=proc --exclude-dir=sys --exclude-dir=media --exclude-dir=mnt --exclude-dir=src --exclude-dir=modules / -e Garbage 1cv7fer
Binary file /var/log/journal/d7b25a27fe064cadb75a2f2f6ca7764e/system.journal matches
grep: /run/user/1000/gvfs: Permission denied
Command exited with non-zero status 2
19.22user 5.84system 0:35.61elapsed 70%CPU (0avgtext+0avgdata 15600maxresident)k
22111388inputs+0outputs (0major+6059minor)pagefaults 0swaps
```

By skipping 6 GB of kernel modules, our `grep` time is 36 seconds. Adding `/lib/modules` by specifying `modules` in the `--exclude-dir` parameter saves 39 seconds.


<a id="hdr10"></a>
<div class="hdr-bar">  <a href="#">Top</a>  <a href="#hdr9">ToS</a>  <a href="#hdr2">ToC</a>  <a href="#hdr11">Skip</a></div>

## Miscellaneous directories

Summary list of other directories:

- /boot saves 3 seconds (but mine is exceptionally large)
- /dev saves 3 seconds
- /run saves 4 seconds
- /var saves 8 seconds

  [1]: https://blog.x-way.org/Linux/2013/12/15/Make-grep-50x-faster.html
















<a id="hdr11"></a>
<div class="hdr-bar">  <a href="#">Top</a>  <a href="#hdr10">ToS</a>  <a href="#hdr2">ToC</a></div>

