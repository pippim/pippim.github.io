---
layout:       post
title:        >
    Accidentally copied files to wrong directory
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/1255496
type:         Answer
tags:         command-line sudo find rm
created_date: 2020-07-01 19:33:32
edit_date:    2020-07-02 23:01:16
votes:        "8 "
favorites:    
views:        "1,201 "
accepted:     
uploaded:     2022-01-16 15:34:09
git_md_url:   https://github.com/pippim/pippim.github.io/blob/main/_posts/2020/2020-07-01-Accidentally-copied-files-to-wrong-directory.md
toc:          false
navigation:   false
clipboard:    false
---

## Piece together solutions available in Stack Exchange.

If you do enough research you will find a solution by combining these five answers:

- [How do I compare file names in two directories in shell script?][1]
- [How can I remove the first line of a text file using bash/sed script?][2]
- [Command to prepend string to each line?][3]
- [giving grep output to rm][4]
- [How do I make rm not give an error if a file doesn't exist?][5]

<!-- Language-all: lang-bash -->

## Trial Run

First run the command without `rm` (remove) option to ensure correct files are being found:

``` 
$ find /usr/local/bin/ /bin/ -printf '%P\n' | sort | uniq -d | tail -n +2 | awk '{print "/bin/" $0}'

/bin/.auto-brightness-config
/bin/auto-brightness-config
/bin/bell
/bin/bell/bell-select-menu
    ( ... OUTPUT SHORTENED ... )
```

## How it works

`find` returns the filenames in Directory 1 (`/usr/local/bin`) followed by Directory 2 (`/bin`(:

### Directory 1 Files in no particular order

- bbbbb
- aaaaa
- yyyyy

### Directory 2 Files in no particular order

- echo
- aaaaa
- zcat
- bbbbb
- egrep
- yyyyy

`sort` sorts the two directories' filenames alphabetically

- aaaaa
- aaaaa
- bbbbb
- bbbbb
- echo
- egrep
- yyyyy
- yyyyy
- zcat

`uniq -d` reports only the duplicates

- aaaaa
- bbbbb
- yyyyy

This gives us a list of Directory 1 filenames that were accidentally copied into Directory 2. But there is a blank line at the top of the list.

`tail -n +2` removed the blank line at the top of the list.

`awk '{print "/bin/" $0}'` prepends `/bin/` to each filename so we have:

- /bin/aaaaa
- /bin/bbbbb
- /bin/yyyyy

## Append the `rm` command to pipeline

Now that we've confirmed output is correct append the `rm` command via `xargs`. Note if you have filenames with special characters read the fourth link above for exceptional handling.

``` 
$ find /usr/local/bin/ /bin/ -printf '%P\n' | sort | uniq -d | tail -n +2 | awk '{print "/bin/" $0}' | xargs rm -f
rm: cannot remove '/bin/.auto-brightness-config': Permission denied
rm: cannot remove '/bin/auto-brightness-config': Permission denied
rm: cannot remove '/bin/bell': Is a directory
rm: cannot remove '/bin/bell/bell-select-menu': Permission denied
```

The `Permission denied` error appears because we must use `sudo` powers to run the command. Note the error `'/bin/bell' is a directory`.  Later we will have to manually removed the directory with `rm -d` command.

## `sudo` powers required for `/bin` directory.

The reason permission denied errors occurred is because `root` owns the files in `/bin` we want to delete and our regular user ID isn't allowed to delete them.

Note depending on how you copied the files into the target directory you may not need need `sudo` powers to delete them. For example if you are defined as the owner of the files in the target directory.

Now lets run command with `sudo` powers:

``` 
$ find /usr/local/bin/ /bin/ -printf '%P\n' | sort | uniq -d | tail -n +2 | awk '{print "/bin/" $0}' | sudo xargs rm -f
rm: cannot remove '/bin/bell': Is a directory
rm: cannot remove '/bin/bell/sounds': Is a directory
rm: cannot remove '/bin/startup-scripts': Is a directory
rm: cannot remove '/bin/zap': Is a directory
rm: cannot remove '/bin/zap/Assembly-Intro-hello': Is a directory
rm: cannot remove '/bin/zap/Assembly-Intro-hello/BeOS': Is a directory
rm: cannot remove '/bin/zap/Assembly-Intro-hello/FreeBSD': Is a directory
rm: cannot remove '/bin/zap/Assembly-Intro-hello/Linux': Is a directory
```
75 files have been deleted but 8 empty sub-directories are left to remove. We use the `-r` recursive option with `rm` command to delete them:

``` 
$ find /usr/local/bin/ /bin/ -printf '%P\n' | sort | uniq -d | tail -n +2 | awk '{print "/bin/" $0}' | sudo xargs rm -rf
```


Nothing is reported so no more errors!

## Summary

The objective of this answer is to not only solve the problem at hand but show the reader how a problem can be solved by checking multiple existing answers in Stack Exchange.


  [1]: https://stackoverflow.com/a/28229014/6929343
  [2]: https://stackoverflow.com/a/339941/6929343
  [3]: https://serverfault.com/a/72749/385348
  [4]: https://unix.stackexchange.com/a/9601/200094
  [5]: https://superuser.com/a/76068/662962
