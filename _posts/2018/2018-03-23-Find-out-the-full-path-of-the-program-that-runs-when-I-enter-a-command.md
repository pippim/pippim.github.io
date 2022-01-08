---
layout:       post
title:        >
    Find out the full path of the program that runs when I enter a command
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/1018403
type:         Answer
tags:         command-line
created_date: 2018-03-23 00:22:47
edit_date:    2020-06-12 14:37:07
votes:        "5 "
favorites:    
views:        "234 "
accepted:     
uploaded:     2022-01-07 19:17:03
toc:          false
navigation:   false
clipboard:    true
---

# If all you want to know is the command location

If you want to know what directory the top level command is stored in you have a number of options:

``` 
$ which uname
/bin/uname

$ type -a uname
uname is /bin/uname

$ locate uname
/bin/uname
    (... SNIP dozens of Windows files on C & D ...)
/usr/lib/klibc/bin/uname
/usr/lib/plainbox-provider-resource-generic/bin/uname_resource
/usr/share/man/man1/uname.1.gz
/usr/share/man/man2/oldolduname.2.gz
/usr/share/man/man2/olduname.2.gz
/usr/share/man/man2/uname.2.gz

```

The last option `locate` returns all files containing `uname` not just the program that is run from the command prompt.

# strace - trace system calls and interrupts

You don't need the `pid` of commands called in order to find the names of various commands that are called by a function. With `strace` all the command names are displayed directly.

For your `uname -n` example the output is:

{% include copyHeader.html %}
``` 
$ strace uname -n
execve("/bin/uname", ["uname", "-n"], [/* 62 vars */]) = 0
brk(NULL)                               = 0x2356000
access("/etc/ld.so.nohwcap", F_OK)      = -1 ENOENT (No such file or directory)
access("/etc/ld.so.preload", R_OK)      = -1 ENOENT (No such file or directory)
open("/etc/ld.so.cache", O_RDONLY|O_CLOEXEC) = 3
fstat(3, {st_mode=S_IFREG|0644, st_size=109073, ...}) = 0
mmap(NULL, 109073, PROT_READ, MAP_PRIVATE, 3, 0) = 0x7ff2f9a9f000
close(3)                                = 0
access("/etc/ld.so.nohwcap", F_OK)      = -1 ENOENT (No such file or directory)
open("/lib/x86_64-linux-gnu/libc.so.6", O_RDONLY|O_CLOEXEC) = 3
read(3, "\177ELF\2\1\1\3\0\0\0\0\0\0\0\0\3\0>\0\1\0\0\0P\t\2\0\0\0\0\0"..., 832) = 832
fstat(3, {st_mode=S_IFREG|0755, st_size=1868984, ...}) = 0
mmap(NULL, 4096, PROT_READ|PROT_WRITE, MAP_PRIVATE|MAP_ANONYMOUS, -1, 0) = 0x7ff2f9a9e000
mmap(NULL, 3971488, PROT_READ|PROT_EXEC, MAP_PRIVATE|MAP_DENYWRITE, 3, 0) = 0x7ff2f94cb000
mprotect(0x7ff2f968b000, 2097152, PROT_NONE) = 0
mmap(0x7ff2f988b000, 24576, PROT_READ|PROT_WRITE, MAP_PRIVATE|MAP_FIXED|MAP_DENYWRITE, 3, 0x1c0000) = 0x7ff2f988b000
mmap(0x7ff2f9891000, 14752, PROT_READ|PROT_WRITE, MAP_PRIVATE|MAP_FIXED|MAP_ANONYMOUS, -1, 0) = 0x7ff2f9891000
close(3)                                = 0
mmap(NULL, 4096, PROT_READ|PROT_WRITE, MAP_PRIVATE|MAP_ANONYMOUS, -1, 0) = 0x7ff2f9a9d000
mmap(NULL, 4096, PROT_READ|PROT_WRITE, MAP_PRIVATE|MAP_ANONYMOUS, -1, 0) = 0x7ff2f9a9c000
arch_prctl(ARCH_SET_FS, 0x7ff2f9a9d700) = 0
mprotect(0x7ff2f988b000, 16384, PROT_READ) = 0
mprotect(0x606000, 4096, PROT_READ)     = 0
mprotect(0x7ff2f9aba000, 4096, PROT_READ) = 0
munmap(0x7ff2f9a9f000, 109073)          = 0
brk(NULL)                               = 0x2356000
brk(0x2377000)                          = 0x2377000
open("/usr/lib/locale/locale-archive", O_RDONLY|O_CLOEXEC) = 3
fstat(3, {st_mode=S_IFREG|0644, st_size=10219008, ...}) = 0
mmap(NULL, 10219008, PROT_READ, MAP_PRIVATE, 3, 0) = 0x7ff2f8b0c000
close(3)                                = 0
uname({sysname="Linux", nodename="alien", ...}) = 0
fstat(1, {st_mode=S_IFCHR|0620, st_rdev=makedev(136, 2), ...}) = 0
write(1, "alien\n", 6alien
)                  = 6
close(1)                                = 0
close(2)                                = 0
exit_group(0)                           = ?
+++ exited with 0 +++

```

For more information refer to `man strace`:

{% include copyHeader.html %}
``` 
STRACE(1)                           General Commands Manual                           STRACE(1)

NAME
       strace - trace system calls and signals

SYNOPSIS
       strace  [-CdffhikqrtttTvVxxy]  [-In] [-bexecve] [-eexpr]...  [-acolumn] [-ofile] [-sstr‐
       size] [-Ppath]... -ppid... / [-D] [-Evar[=val]]... [-uusername] command [args]

       strace -c[df] [-In] [-bexecve] [-eexpr]...   [-Ooverhead]  [-Ssortby]  -ppid...  /  [-D]
       [-Evar[=val]]... [-uusername] command [args]

DESCRIPTION
       In  the  simplest  case strace runs the specified command until it exits.  It intercepts
       and records the system calls which are called by a process and  the  signals  which  are
       received by a process.  The name of each system call, its arguments and its return value
       are printed on standard error or to the file specified with the -o option.

       strace is a useful diagnostic, instructional, and debugging  tool.   System  administra‐
       tors,  diagnosticians  and trouble-shooters will find it invaluable for solving problems
       with programs for which the source is not readily available since they do not need to be
       recompiled  in  order to trace them.  Students, hackers and the overly-curious will find
       that a great deal can be learned about a system and its system  calls  by  tracing  even
       ordinary  programs.   And  programmers will find that since system calls and signals are
       events that happen at the user/kernel interface, a close examination of this boundary is
       very  useful  for  bug  isolation, sanity checking and attempting to capture race condi‐
       tions.

```

*Above is just the beginning of manpage for `strace`*



