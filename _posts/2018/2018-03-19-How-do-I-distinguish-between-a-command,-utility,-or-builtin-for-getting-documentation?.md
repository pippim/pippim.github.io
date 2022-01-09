---
layout:       post
title:        >
    How do I distinguish between a command, utility, or builtin for getting documentation?
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/1017149
type:         Answer
tags:         command-line manpage documentation info
created_date: 2018-03-19 01:22:18
edit_date:    2018-03-19 10:27:21
votes:        "3 "
favorites:    
views:        "261 "
accepted:     
uploaded:     2022-01-09 09:42:38
toc:          false
navigation:   false
clipboard:    true
---

Some builtin commands are included for efficiency sake and exist as external commands in the first place. For example:



``` bash
$ type -a echo
echo is a shell builtin
echo is /bin/echo

$ type -a printf
printf is a shell builtin
printf is /usr/bin/printf

```

A detailed analysis of builtins and external commands can be found in [Unix & Linux][1].


----------

As far as getting help for dual builtins/external commands such as `echo` you have two choices. One method is by using `man echo`:

{% include copyHeader.html %}
``` bash
ECHO(1)                               User Commands                               ECHO(1)

NAME
       echo - display a line of text

SYNOPSIS
       echo [SHORT-OPTION]... [STRING]...
       echo LONG-OPTION

DESCRIPTION
       Echo the STRING(s) to standard output.

       -n     do not output the trailing newline

       -e     enable interpretation of backslash escapes

       -E     disable interpretation of backslash escapes (default)

       --help display this help and exit

       --version
              output version information and exit

       If -e is in effect, the following sequences are recognized:

       \\     backslash

       \a     alert (BEL)

 Manual page echo(1) line 1 (press h for help or q to quit)

```

And you can type:

{% include copyHeader.html %}
``` bash
$ help echo
echo: echo [-neE] [arg ...]
    Write arguments to the standard output.
    
    Display the ARGs, separated by a single space character and followed by a
    newline, on the standard output.
    
    Options:
      -n	do not append a newline
      -e	enable interpretation of the following backslash escapes
      -E	explicitly suppress interpretation of backslash escapes
    
    `echo' interprets the following backslash-escaped characters:
      \a	alert (bell)
      \b	backspace
      \c	suppress further output
      \e	escape character
      \E	escape character
      \f	form feed
      \n	new line
      \r	carriage return
      \t	horizontal tab
      \v	vertical tab
      \\	backslash
      \0nnn	the character whose ASCII code is NNN (octal).  NNN can be
    	0 to 3 octal digits
      \xHH	the eight-bit character whose value is HH (hexadecimal).  HH
    	can be one or two hex digits
    
    Exit Status:
    Returns success unless a write error occurs.

```

  [1]: https://unix.stackexchange.com/a/1359/200094

