---
layout:       post
title:        >
    Copy group of files (Filename*) to backup (Filename*.bak)
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/1153995
type:         Answer
tags:         command-line cp ms-dos
created_date: 2019-06-26 00:44:37
edit_date:    2019-06-27 23:20:51
votes:        "4 "
favorites:    
views:        "10,922 "
accepted:     Accepted
uploaded:     2025-08-10 20:14:13
git_md_url:   https://github.com/pippim/pippim.github.io/blob/main/_posts/2019/2019-06-26-Copy-group-of-files-_Filename*_-to-backup-_Filename*.bak_.md
toc:          false
navigation:   false
clipboard:    false
---

I wrote this one-liner into my `~/.bashrc`. Much better answers using `find` can be posted I suppose. Even better answers could be written in in C. Hopefully this Q&A gets the ball rolling for better answers:



``` bash
cps () {
    # cps "Copy Splat", copy group of files to backup, ie "cps Filename .bak"
    # Copies Filename1 to Filename1.bak, Filename2 to Filename2.bak, etc.
    # If Filename1.bak exists, don't copy it to Filename1.bak.bak
    for f in "$1"*; do [[ ! "$f" == *"$2" ]] && cp -a "$f" "$f$2"; done

    # OLD version comments suggested to remove 
    # ls "$1"* | while read varname; do cp -a "$varname" "$varname$2"; done
}

```
- `for f in "$1"*; do` : `$1` is the `gmail-meta3` parameter and `f` is the list of files matching. Combined this means for gmail-meta3, gmail-meta3-LAB-9999, etc. do the following
- `[[ ! "$f" == *"$2" ]] &&` : `$f` is the same as `f` above. `$2` is the `.bak` parameter passed. Combined this means if the filename doesn't end in `.bak` (because we don't want to copy `.bak` and create `.bak.bak`) then do the following
- `cp -a "$f" "$f$2";` copy gmail-meta3 to gmail-meta3.bak, etc.
- `done` : loop back and grab next filename in `gmail-meta3`* list.


----------

## `cps gmail-meta3 .bak` Sample Output

Using the question as an example here is how it looks in action:

``` bash
───────────────────────────────────────────────────────────────────────────────────────────
rick@alien:~/gmail$ ll gmail-meta3*
-rw-rw-r-- 1 rick rick 26467821 May 20 16:43 gmail-meta3
-rw-rw-r-- 1 rick rick 26467821 May 20 16:43 gmail-meta3.bak
-rw-rw-r-- 1 rick rick      643 May 20 16:43 gmail-meta3-LAB-1558392194-26467821
-rw-rw-r-- 1 rick rick      643 May 20 16:43 gmail-meta3-LAB-1558392194-26467821.bak
-rw-rw-r-- 1 rick rick    49607 May 20 16:44 gmail-meta3-REC-1558392194-26467821
-rw-rw-r-- 1 rick rick    49607 May 20 16:44 gmail-meta3-REC-1558392194-26467821.bak
-rw-rw-r-- 1 rick rick   728954 Jun 27 17:04 gmail-meta3-YAD-1558392194-26467821
-rw-rw-r-- 1 rick rick   728954 Jun 27 05:46 gmail-meta3-YAD-1558392194-26467821.bak
───────────────────────────────────────────────────────────────────────────────────────────
rick@alien:~/gmail$ cps gmail-meta3 .bak
───────────────────────────────────────────────────────────────────────────────────────────
rick@alien:~/gmail$ ll gmail-meta3*
-rw-rw-r-- 1 rick rick 26467821 May 20 16:43 gmail-meta3
-rw-rw-r-- 1 rick rick 26467821 May 20 16:43 gmail-meta3.bak
-rw-rw-r-- 1 rick rick      643 May 20 16:43 gmail-meta3-LAB-1558392194-26467821
-rw-rw-r-- 1 rick rick      643 May 20 16:43 gmail-meta3-LAB-1558392194-26467821.bak
-rw-rw-r-- 1 rick rick    49607 May 20 16:44 gmail-meta3-REC-1558392194-26467821
-rw-rw-r-- 1 rick rick    49607 May 20 16:44 gmail-meta3-REC-1558392194-26467821.bak
-rw-rw-r-- 1 rick rick   728954 Jun 27 17:04 gmail-meta3-YAD-1558392194-26467821
-rw-rw-r-- 1 rick rick   728954 Jun 27 17:04 gmail-meta3-YAD-1558392194-26467821.bak
───────────────────────────────────────────────────────────────────────────────────────────
rick@alien:~/gmail$ 
```

**Note:** This uses the `-a` flag with the `cp` command to preserve timestamps and give you better grasp of your file backups.

Notice how the file copies have the exact same date and time as the originals. If the `-a` parameter was omitted they would be given the current date and time and wouldn't look like a true backup except that the file size would be the same.

