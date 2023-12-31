---
layout:       post
title:        >
    Show sum of file sizes in directory listing
site:         Unix & Linux
stack_url:    https://unix.stackexchange.com/q/672639
type:         Answer
tags:         bash shell-script awk ls
created_date: 2021-10-10 13:03:49
edit_date:    2021-10-10 13:39:38
votes:        "1 "
favorites:    
views:        "375,199 "
accepted:     
uploaded:     2023-12-31 10:24:11
git_md_url:   https://github.com/pippim/pippim.github.io/blob/main/_posts/2021/2021-10-10-Show-sum-of-file-sizes-in-directory-listing.md
toc:          false
navigation:   false
clipboard:    false
---

`tee` will solve the problem of output disappearing on screen when it is piped to another command like `awk`.

So the command:

``` 
ls -FaGl | printf "%'d\n" $(awk '{SUM+=$4}END{print SUM}')
```

which only prints:

``` 
63,519,676,015
```

Is replaced with the command:

``` 
ls -FaGl | tee /dev/stderr | printf "%'d\n" $(awk '{SUM+=$4}END{print SUM}')
```

and now the full file listing appears with total:

``` 
total 62031069
drwxrwxrwx 1 rick      20480 Oct  9 15:47 ./
drwxrwxrwx 1 rick      12288 Jul 20  2020 ../
drwxrwxrwx 1 rick          0 Oct 15  2017 Captures/
-rwxrwxrwx 1 rick        504 Jun 29  2020 desktop.ini*
drwxrwxrwx 1 rick       4096 Nov 18  2017 Mass Effect Andromeda/
-rwxrwxrwx 1 rick  210355992 Nov  8  2019 Screencapture 2019-11-08 at 13.07.14.mp4*
-rwxrwxrwx 1 rick  127445089 Nov  8  2019 Screencapture 2019-11-08 at 13.43.55.mp4*
-rwxrwxrwx 1 rick  997439911 Nov 11  2019 simplescreenrecorder-2019-11-11_21.42.51.mkv*
   ( Long listing snipped... )
-rwxrwxrwx 1 rick 1546689758 Sep  6 22:35 simplescreenrecorder-2021-09-06_21.18.29*
-rwxrwxrwx 1 rick  422607080 Sep 18 19:13 simplescreenrecorder-2021-09-18_18.57.00*
63,519,676,015
```

## TL;DR

Insert `| tee /dev/stderr` into your pipeline.

### Total in human readable format

In my own `~/.bashrc` is this function:

``` 
$ grep 'BytesToHuman(' -A20 ~/.bashrc

function BytesToHuman() {

    # https://unix.stackexchange.com/questions/44040/a-standard-tool-to-convert-a-byte-count-into-human-kib-mib-etc-like-du-ls1/259254#259254

    read StdIn
    if ! [[ $StdIn =~ ^-?[0-9]+$ ]] ; then
        echo "$StdIn"       # Simply pass back what was passed to us
        exit 1              # Floats or strings not allowed. Only integers.
    fi

    b=${StdIn:-0}; d=''; s=0; S=(Bytes {K,M,G,T,E,P,Y,Z}iB)
    while ((b > 1024)); do
        d="$(printf ".%02d" $((b % 1024 * 100 / 1024)))"
        b=$((b / 1024))
        let s++
    done

    echo "$b$d ${S[$s]}"
    exit 0                  # Success!

} # BytesToHuman ()
```

So simply add `| BytesToHuman` to the end of the pipeline. Also remove `printf` builtin that was used previously:

``` 
ls -FaGl | tee /dev/stderr | awk '{SUM+=$4}END{print SUM}' | BytesToHuman
```

This will now display the total as:

``` 
59.15 GiB
```

If you would prefer to see `63.51 GB` then the `BytesToHuman()` function needs to be changed from:

``` 
b=${StdIn:-0}; d=''; s=0; S=(Bytes {K,M,G,T,E,P,Y,Z}iB)
while ((b > 1024)); do
    d="$(printf ".%02d" $((b % 1024 * 100 / 1024)))"
    b=$((b / 1024))
```

To:

``` 
b=${StdIn:-0}; d=''; s=0; S=(Bytes {K,M,G,T,E,P,Y,Z}B)
while ((b > 1000)); do
    d="$(printf ".%02d" $((b % 1000 * 100 / 1000)))"
    b=$((b / 1000))
```
