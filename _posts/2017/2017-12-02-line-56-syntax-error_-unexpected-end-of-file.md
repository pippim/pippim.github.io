---
layout:       post
title:        >
    line 56 syntax error: unexpected end of file
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/982586
type:         Answer
tags:         bash syntax
created_date: 2017-12-02 22:53:32
edit_date:    2017-12-05 11:22:38
votes:        "3 "
favorites:    
views:        "1,909 "
accepted:     
uploaded:     2022-08-21 17:57:54
git_md_url:   https://github.com/pippim/pippim.github.io/blob/main/_posts/2017/2017-12-02-line-56-syntax-error_-unexpected-end-of-file.md
toc:          false
navigation:   false
clipboard:    false
---

You can run your script through [shell checker][1]:



``` text
$ shellcheck myscript
 
Line 7:
CIVIS(){ $e "\e[25l"}
^-- SC1009: The mentioned parser error was in this function.
       ^-- SC1073: Couldn't parse this brace group.
                    ^-- SC1083: This } is literal. Check expression (missing ;/\n?) or quote it.
 
Line 23:
         if [[$key = $ESC[A ]];then echo up;fi
            ^-- SC1035: You need a space after the [[ and before the ]].
 
Line 24:
         if [[$key = $ESC[B ]];then echo dn;fi;}
            ^-- SC1035: You need a space after the [[ and before the ]].
 
Line 42:
        if [[ $after -eq 0 ]] || [$before -eq $LM ];then 
                                 ^-- SC1035: You need a space after the [ and before the ].
 
Line 56:

^-- SC1056: Expected a '}'. If you have one, try a ; or \n in front of it.
^-- SC1072: Missing '}'. Fix any mentioned problems and try again.

$ 
```

As the shell checker tells us you need to change line 7 from:

``` text
CIVIS(){ $e "\e[25l"}
```

to:

``` text
CIVIS(){ $e "\e[25l";}
```


  [1]: https://www.shellcheck.net/
