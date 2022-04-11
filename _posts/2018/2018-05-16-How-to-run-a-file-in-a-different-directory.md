---
layout:       post
title:        >
    How to run a file in a different directory
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/1037165
type:         Answer
tags:         command-line
created_date: 2018-05-16 23:20:52
edit_date:    2018-05-24 02:07:37
votes:        "10 "
favorites:    
views:        "58,402 "
accepted:     
uploaded:     2022-04-11 04:33:50
git_md_url:   https://github.com/pippim/pippim.github.io/blob/main/_posts/2018/2018-05-16-How-to-run-a-file-in-a-different-directory.md
toc:          false
navigation:   false
clipboard:    false
---

No you don't need to use:

``` 
cd home/directoryA/directoryB/directoryC/DirectoryD
./somefile 
```

You can simply run the command by prefixing it with its path:

``` 
/home/directoryA/directoryB/directoryC/DirectoryD/somefile
```

Because you are already in the `/home/directoryA` you can use the current directory shortcut `.` and run the command like this:

``` 
./directoryB/directoryC/DirectoryD/somefile
```


----------

I noticed OP has expanded scope via comments under other answers. Here is some additional information:

- To find out where `somefile` is located use: `locate somefile`.
- If `somefile` was added today you need to first update the **locate** database by running `sudo updatedb`.
- When there are multiple versions of `somefile` located in the **PATH** you can find out which one is executed first use `which somefile`.
- If you want to run `somefile` without specifying a directory name in front put it in the path. To check the path use `echo $PATH`. Common path locations to put `somefile` are `/usr/local/bin` (if it uses sudo powers) and `/home/your_user_name/bin` (you might have to create the directory first).
- You can also add `/home/directoryA/directoryB/directoryC/DirectoryD/` to your path but that would be highly unusual. However you could then simply type `somefile` no matter what directory you are in and it will run.
- Of course `somefile` must be executable which you set with the command: `chmod a+x /home/directoryA/directoryB/directoryC/DirectoryD/somefile`
