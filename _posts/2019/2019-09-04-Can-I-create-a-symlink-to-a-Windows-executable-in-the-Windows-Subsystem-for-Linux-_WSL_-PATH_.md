---
layout:       post
title:        >
    Can I create a symlink to a Windows executable in the Windows Subsystem for Linux (WSL) PATH?
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/1170907
type:         Answer
tags:         command-line java jdk symbolic-link windows-subsystem-for-linux
created_date: 2019-09-04 21:49:51
edit_date:    2019-09-04 23:49:17
votes:        "6 "
favorites:    
views:        "7,797 "
accepted:     Accepted
uploaded:     2022-02-12 11:18:14
git_md_url:   https://github.com/pippim/pippim.github.io/blob/main/_posts/2019/2019-09-04-Can-I-create-a-symlink-to-a-Windows-executable-in-the-Windows-Subsystem-for-Linux-_WSL_-PATH_.md
toc:          false
navigation:   false
clipboard:    false
---

You need to prefix the executable with its path. Alternatively you can modify the Linux `PATH` environment variable and append the Windows path (prefixed with `/mnt/c/`).

From: [Windows Subsystem for Linux interoperability with Windows][1]

> ## Invoking Windows binaries from WSL  
>   
> The Windows Subsystem for Linux can invoke Windows binaries directly  
> from the WSL command line. Applications run this way have the  
> following properties:  
>   
> 1.    Retain the working directory as the WSL command prompt except in the scenario explained below.  
> 2.    Have the same permission rights as the bash.exe process.  
> 3.    Run as the active Windows user.  
> 4.    Appear in the Windows Task Manager as if directly executed from the CMD prompt.  
>   
> Example:  
>   
>     $ /mnt/c/Windows/System32/notepad.exe  
>   
> In WSL, these executables are handled similar to native Linux  
> executables. This means adding directories to the Linux path and  
> piping between commands works as expected. Examples:  
>   
>     $ export PATH=$PATH:/mnt/c/Windows/System32  
>     $ notepad.exe  
>     $ ipconfig.exe | grep IPv4 | cut -d: -f2  
>     $ ls -la | findstr.exe foo.txt  
>     $ cmd.exe /c dir  
>   
> The Windows binary must include the file extension, match the file  
> case, and be executable. Non-executables including batch scripts and  
> command like `dir` can be run with `/mnt/c/Windows/System32/cmd.exe  
> /C` command.  
>   
> Examples:  
>   
>     $ /mnt/c/Windows/System32/cmd.exe /C dir  
>     $ /mnt/c/Windows/System32/PING.EXE www.microsoft.com  
>   
> Parameters are passed to the Windows binary unmodified.  

Even in Linux symbolic links contain the path. Take for example this command:

``` 
$ ls -la /bin | grep ^l
(...SNIP...)
lrwxrwxrwx  1 root root      20 Jun 27 09:49 systemd -> /lib/systemd
```

`systemd` is linked to `/lib/systemd/systemd`. So your symbolic link of:

``` 
sudo ln -s -t java.exe java
```

I imagine (because I'm not a link expert) would need to look something like:

``` 
sudo ln -s -t /mnt/c/Windows/Path/To/java.exe java
## ```



## Use `alias` instead of symbolic link

Rather than a symbolic link I would create an alias in my `~/.bashrc` file thusly:

``` 
alias java='/mnt/c/WindowsPathTo/java.exe'
```

Then whenever you type `java` the mumbo-jumbo is typed on your behalf. Any parameters passed are honoured.

  [1]: https://docs.microsoft.com/en-us/windows/wsl/interop#run-linux-tools-from-a-windows-command-line
