---
layout:       post
title:        >
    Text processing Aptly output file
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/1155253
type:         Answer
tags:         text-processing sed awk
created_date: 2019-07-01 16:31:39
edit_date:    2020-06-12 14:37:07
votes:        "3 "
favorites:    
views:        "165 "
accepted:     
uploaded:     2022-01-02 16:07:48
toc:          false
navigation:   true
clipboard:    true
---


<a id="hdr1"></a>
<div class="hdr-bar">  <a href="#hdr2" class ="hdr-btn">Skip</a></div>

# Two answers in one

I've posted two answers here:

- A bash script which is hopefully easier to understand
- A one-liner using common Linux utilities `grep`, `sed` and `cut`


<a id="hdr2"></a>
<div class="hdr-bar">  <a href="#" class ="hdr-btn">Top</a>  <a href="#hdr1" class ="hdr-btn">ToS</a>  <a href="#hdr3" class ="hdr-btn">Skip</a></div>

# How the Bash script looks in operation

I've turned off gnome-terminal line wrap to make input and output files easier to read.

<!-- Language-all: lang-bash -->

{% include copyHeader.html %}
``` 
───────────────────────────────────────────────────────────────────────────────────────────
rick@alien:~/askubuntu$ tput rmam # Turn off line wrap
───────────────────────────────────────────────────────────────────────────────────────────
rick@alien:~/askubuntu$ cat aptfilein
Published repositories:
 * test_repo_one/xenial [i386,amd64] publishes {main: [xenial-main_20190311]: Snapshot from mirr}
 * test_repo_one/xenial-security [i386,amd64] publishes {main: [xenial-security-main_20190311]: }
 * test_repo_two/trusty [i386,amd64] publishes {main: [trusty-main_20190312]: Snapshot from mirr}
...
───────────────────────────────────────────────────────────────────────────────────────────
rick@alien:~/askubuntu$ time aptfileparse.sh
5 lines read from aptfilein
3 lines written to aptfileout

real    0m0.025s
user    0m0.016s
sys     0m0.004s
───────────────────────────────────────────────────────────────────────────────────────────
rick@alien:~/askubuntu$ cat aptfileout
 test_repo_one/xenial [xenial-main_20190311] [xenial-multiverse_20190311] [xenial-restricted_201]
 test_repo_one/xenial-security [xenial-security-main_20190311] [xenial-security-multiverse_20190]
 test_repo_two/trusty [trusty-main_20190312] [trusty-multiverse_20190312] [trusty-restricted_201]
───────────────────────────────────────────────────────────────────────────────────────────
rick@alien:~/askubuntu$ 

```


----------



<a id="hdr3"></a>
<div class="hdr-bar">  <a href="#" class ="hdr-btn">Top</a>  <a href="#hdr2" class ="hdr-btn">ToS</a>  <a href="#hdr4" class ="hdr-btn">Skip</a></div>

# The actual Bash script

Remember to make the script executable with `chmod a+x script.sh`

{% include copyHeader.html %}
``` 
#!/bin/bash

# NAME: aptfileparse.sh
# PATH: ~/askubuntu
# DESC: Parse Apt File giving new lines.
# DATE: July 1, 2019.
# NOTE: For: https://askubuntu.com/questions/1127821/text-processing-aptly-output-file
#       Program would be ~10 lines shorter (but harder to read) with arrays.

: <<'END'
/* -----------------------------------------------------------------------------

INPUT FILE LAYOUT
=================

Published repositories:
 * test_repo_one/xenial [i386,amd64] publishes {main: [xenial-main_20190311]: Snapshot from mirror [xenial-main]: http//gb.archive.ubuntu.com/ubuntu/ xenial [src]}, {multiverse: [xenial-multiverse_20190311]: Snapshot from mirror [xenial-multiverse]: http//gb.archive.ubuntu.com/ubuntu/ xenial [src]}, {restricted: [xenial-restricted_20190311]: Snapshot from mirror [xenial-restricted]: http//gb.archive.ubuntu.com/ubuntu/ xenial [src]}, {universe: [xenial-universe_20190311]: Snapshot from mirror [xenial-universe]: http//gb.archive.ubuntu.com/ubuntu/ xenial [src]}
 * test_repo_one/xenial-security [i386,amd64] publishes {main: [xenial-security-main_20190311]: Snapshot from mirror [xenial-security-main]: http//gb.archive.ubuntu.com/ubuntu/ xenial-security[src]}, {multiverse: [xenial-security-multiverse_20190311]: Snapshot from mirror [xenial-security-multiverse]: http//gb.archive.ubuntu.com/ubuntu/ xenial-security[src]}, {restricted: [xenial-security-restricted_20190311]: Snapshot from mirror [xenial-security-restricted]: http//gb.archive.ubuntu.com/ubuntu/ xenial-security[src]}, {universe: [xenial-security-universe_20190311]: Snapshot from mirror [xenial-security-universe]: http//gb.archive.ubuntu.com/ubuntu/ xenial-security[src]}
 * test_repo_two/trusty [i386,amd64] publishes {main: [trusty-main_20190312]: Snapshot from mirror [trusty-main]: http//gb.archive.ubuntu.com/ubuntu/ trusty[src]}, {multiverse: [trusty-multiverse_20190312]: Snapshot from mirror [trusty-multiverse]: http//gb.archive.ubuntu.com/ubuntu/ trusty[src]}, {restricted: [trusty-restricted_20190312]: Snapshot from mirror [trusty-restricted]: http//gb.archive.ubuntu.com/ubuntu/ trusty[src]}, {universe: [trusty-universe_20190312]: Snapshot from mirror [trusty-universe]: http//gb.archive.ubuntu.com/ubuntu/ trusty[src]}
...

OUTPUT FILE LAYOUT
==================

 test_repo_one/xenial [xenial-main_20190311] [xenial-multiverse_20190311] [xenial-restricted_20190311] [xenial-universe_20190311]

Five fields to extract: name, main, multiverse, restricted, universe

----------------------------------------------------------------------------- */
END

 INPUT="aptfilein"
OUTPUT="aptfileout"

> "$OUTPUT" # Erase previous output file

# Read all input lines
while IFS= read -r line ; do

    let CountIn++
    ! [[ "$line" =~ " *" ]] && continue     # skip lines not starting " *"
    # Get name
    line="${line#" * "}"                    # remove leading " * "
    lout="${line%%" "*}"                    # name is up to next " "
    line="${line#" "*}"                     # remove name from line
    # Get main
    line="${line#*"{main: "}"               # remove leading "{main: "
    lout="$lout ${line%%":"*}"              # main is up to next ":"
    line="${line#":"*}"                     # remove name from line
    # Get multiverse
    line="${line#*"{multiverse: "}"         # remove leading "{multiverse: "
    lout="$lout ${line%%":"*}"              # maultiverse is up to next ":"
    line="${line#":"*}"                     # remove multiverse from line
    # Get restricted
    line="${line#*"{restricted: "}"         # remove leading "{restricted: "
    lout="$lout ${line%%":"*}"              # restricted is up to next ":"
    line="${line#":"*}"                     # remove restricted from line
    # Get universe
    line="${line#*"{universe: "}"           # remove leading "{universe: "
    lout="$lout ${line%%":"*}"              # universe is up to next ":"
    line="${line#":"*}"                     # remove universe from line

    # Append line to output file with leading space
    echo " $lout" >> "$OUTPUT"
    let CountOut++

done < "$INPUT"

echo  "$CountIn lines read from $INPUT"
echo "$CountOut lines written to $OUTPUT"

```


----------



<a id="hdr4"></a>
<div class="hdr-bar">  <a href="#" class ="hdr-btn">Top</a>  <a href="#hdr3" class ="hdr-btn">ToS</a>  <a href="#hdr5" class ="hdr-btn">Skip</a></div>

# One-liner with common utilities

One-liners are popular in the Linux community and there are some excellent `awk` and `perl` answers posted in this Q&A. Here is an example using common utilities most experienced command line users are familiar with:

``` 
$ time grep ^" \*" aptfilein | sed 's/ \* //;s/ /: /;s/^/ /' | cut -d':' -f1,3,6,9,12 --output-delimiter=''
 test_repo_one/xenial [xenial-main_20190311] [xenial-multiverse_20190311] [xenial-restricted_20190311] [xenial-universe_20190311]
 test_repo_one/xenial-security [xenial-security-main_20190311] [xenial-security-multiverse_20190311] [xenial-security-restricted_20190311] [xenial-security-universe_20190311]
 test_repo_two/trusty [trusty-main_20190312] [trusty-multiverse_20190312] [trusty-restricted_20190312] [trusty-universe_20190312]

real    0m0.011s
user    0m0.003s
sys     0m0.008s

```

- `grep ^" \*" aptfilein` - the `grep` command selects lines containing a search string. The carrot (`^`) denotes the string must start at the beginning of the line. The backslash (`\`) denotes the asterisk/splat (`*`) is to be taken literally and not act as a wildcard character that selects everything. In summary this `grep` command selects all lines beginning with ` *` in file `aptfilein`.
- `sed` is a "stream editor" that edits lines coming in and changes them and passes them out. There are three `sed` changes here `'s/ \* //;s/ /: /;s/^/ /'`. The changes are between quotes (`'`) and delineated (separated) by a semi-colon (`;`) deliminator. They are broken down in next three points.
- `s/ \* //` - search first occurrence of ` * ` and change it to null. This will erase the ` * ` that begins at each line.
- `s/ /: /` - searches for the first space and changes it into a colon (`:`) followed by a space. This is necessary to change our first field into a key. For example `test_repo_one/xenial ` becomes `test_repo_one/xenial: `.
- `s/^/ /` - tells `sed` to insert a space at the beginning of each line.
- `cut -d':' -f1,3,6,9,12 --output-delimiter=''` - Uses the `cut` command to select key fields # 1, 3, 6, 9 and 12. The key fields are delimited by a colon as argument `-d':'` stipulates. Normally output fields are delimited the same but this is overridden to null using --output-delimiter=''` parameter.

**Note:** The one-liner is faster than bash which is slower at string processing.


<a id="hdr5"></a>
<div class="hdr-bar">  <a href="#" class ="hdr-btn">Top</a>  <a href="#hdr4" class ="hdr-btn">ToS</a></div>

