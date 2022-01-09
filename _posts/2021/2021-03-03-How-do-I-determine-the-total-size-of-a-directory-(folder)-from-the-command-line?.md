---
layout:       post
title:        >
    How do I determine the total size of a directory (folder) from the command line?
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/1320936
type:         Answer
tags:         filesystem command-line
created_date: 2021-03-03 21:45:02
edit_date:    
votes:        "2 "
favorites:    
views:        "1,325,224 "
accepted:     
uploaded:     2022-01-09 09:42:38
toc:          false
navigation:   false
clipboard:    false
---

I'm conditioned to the `ll` command which is aliased to `ls -alF`. It is just missing a file count and size of files at the bottom. I played with `du` and `tree` but could not get the totals I needed. So I created `lll` to do that for me.

In your `~/.bashrc` place the following:

``` bash
lll () {
    ls -alF "$@"
    arr=($(ls -alF "$@" | awk '{TOTAL+=$5} END {print NR, TOTAL}'))
    printf " \33[1;31m ${arr[0]}\33[m line(s).  "
    printf "Total size: \33[1;31m ${arr[1]}\33[m\n"
#    printf "Total size: \33[1;31m $(BytesToHuman <<< ${arr[1]})\33[m\n"
}
```

Save the file and resource it using `. ~/.bashrc` (or you can restart your terminal).


----------


## Sample output

The nice thing about `ll` output is it's colors. This is maintained with `lll` but lost when using `find` or `du`:

[![lll sample output.png][1]][1]


----------


## TL;DR

A bonus function you can add to `~/.bashrc` is called `BytesToHuman()`. This does what most console users would expect converting large numbers to MiB, GiB, etc:

``` bash
function BytesToHuman() {

    # https://unix.stackexchange.com/questions/44040/a-standard-tool-to-convert-a-byte-count-into-human-kib-mib-etc-like-du-ls1/259254#259254

    read StdIn

    b=${StdIn:-0}; d=''; s=0; S=(Bytes {K,M,G,T,E,P,Y,Z}iB)
    while ((b > 1024)); do
        d="$(printf ".%02d" $((b % 1024 * 100 / 1024)))"
        b=$((b / 1024))
        let s++
    done
    echo "$b$d ${S[$s]}"

} # BytesToHuman ()
```

Next flip the comment between two lines in `lll ()` function to look like this:

``` bash
#    printf "Total size: \33[1;31m ${arr[1]}\33[m\n"
    printf "Total size: \33[1;31m $(BytesToHuman <<< ${arr[1]})\33[m\n"
```

Now your output looks like this:

[![lll sample output 2.png][2]][2]

As always don't forget to re-source with `. ~/.bashrc` whenever making changes. (Or restart the terminal of course)

PS - Two weeks in self-quarantine finally gave me time to work on this five year old goal.

  [1]: https://i.stack.imgur.com/D8Ctw.png
  [2]: https://i.stack.imgur.com/QO013.png
