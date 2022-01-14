---
layout:       post
title:        >
    What does shellcheck warning SC2129 “Consider using { cmd1; cmd2; } >> file instead of individual redirects.” mean?
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/1147775
type:         Question
tags:         bash debugging output
created_date: 2019-06-01 01:43:37
edit_date:    2020-06-12 14:37:07
votes:        "6 "
favorites:    
views:        "730 "
accepted:     Accepted
uploaded:     2022-01-14 05:03:29
git_md_url:   https://github.com/pippim/pippim.github.io/blob/main/_posts/2019/2019-06-01-What-does-shellcheck-warning-SC2129-“Consider-using-{-cmd1^-cmd2^-}->>-file-instead-of-individual-redirects.”-mean^.md
toc:          false
navigation:   false
clipboard:    false
---

I have this `shellcheck` warning I can't figure out:

``` 
In /mnt/e/bin/iconic line 540:
            printf "FALSE|" >> "$IconsRaw"           # Select field number 1
            ^-- SC2129: Consider using { cmd1; cmd2; } >> file instead of individual redirects.

```

I've noticed many of us here use [shellcheck][1] to fix our bash scripts / shell commands so I hope the question is on topic.

----------

As per comments posting relevant section of bash script:

``` 
    if [[ "$X" == "?" || "$Y" == "?" ]] ; then
        : # Bad X or Y offset usually "Link to Name.ext~" (backup name)
    else
        let i++
        printf "FALSE|" >> "$IconsRaw"           # Select field number 1
        printf "%s|" "$i" >> "$IconsRaw"         # 2
        printf "%s|" "${File##*/}" >> "$IconsRaw"
        printf "%s|" "$Linkless" >> "$IconsRaw"  # 4
        printf "%s|" "$Date" >> "$IconsRaw"      # 5
        printf "%s|" "$X" >> "$IconsRaw"         # 6
        echo   "$Y" >> "$IconsRaw"               # 7
    fi

```


----------

## Solution

Thanks to accepted answer and comments I've learned that `shellcheck` not only catches errors in your code, but also suggests performance improvements. In this case the filename `$IconsRaw` was being opened and closed many times with each `printf` and `echo`. 

The more efficient bash code:

``` 
    # X,Y screen coordinates invalid on backup files ending with "~"
    ! [[ "$X" == "?" || "$Y" == "?" ]] && { let i++; echo \
        "FALSE|$i|${File##*/}|$Linkless|$Date|$X|$Y" >> "$IconsRaw"; }

```


  [1]: https://www.shellcheck.net/
