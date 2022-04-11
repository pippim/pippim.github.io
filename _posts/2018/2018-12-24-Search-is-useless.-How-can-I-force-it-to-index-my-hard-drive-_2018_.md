---
layout:       post
title:        >
    Search is useless. How can I force it to index my hard drive (2018)
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/1104112
type:         Answer
tags:         18.04 nautilus gnome-shell search yad
created_date: 2018-12-24 00:01:35
edit_date:    2018-12-24 21:36:09
votes:        "3 "
favorites:    
views:        "948 "
accepted:     
uploaded:     2022-04-11 04:33:50
git_md_url:   https://github.com/pippim/pippim.github.io/blob/main/_posts/2018/2018-12-24-Search-is-useless.-How-can-I-force-it-to-index-my-hard-drive-_2018_.md
toc:          false
navigation:   true
clipboard:    true
---

Files are indexed for the `locate` command but normally it is updated every day so any new file you created today won't show up until tomorrow. I've circumvented this shortfall by putting `sudo updatedb` as a cron job that runs every 15 minutes (it only takes a few seconds to run).



The `locate` command behaves as if wildcards are used:

``` bash
$ time locate etc/profile
/etc/profile
/etc/profile.d
/etc/profile.d/appmenu-qt5.sh
/etc/profile.d/apps-bin-path.sh
/etc/profile.d/bash_completion.sh
/etc/profile.d/cedilla-portuguese.sh
/etc/profile.d/jdk.csh
/etc/profile.d/jdk.sh
/etc/profile.d/vte-2.91.sh

real	0m0.696s
user	0m0.671s
sys 	0m0.024s
```


I prefixed the `locate` command with the `time` command so you can see how blindingly fast it is doing lookups on indexed filenames and directory names with implied wildcards.

----------


The `locate` output is rather sparse so I created an alias `llocate` to format the output nicely (https://askubuntu.com/questions/1039235/how-to-make-locate-output-look-like-ll-or-ls-la-but-nicer/1039236#1039236):

``` bash
$ time llocate etc/profile
ACCESS      OWNER  GROUP  SIZE  MODIFIED      NAME (updatdb last ran: 2018-07-01 11:30:05)
-rw-r--r--  root   root   575   Nov 12  2017  /etc/profile
drwxr-xr-x  root   root   4096  Jun  4 17:19  /etc/profile.d
-rw-r--r--  root   root   40    Feb 16  2017  /etc/profile.d/appmenu-qt5.sh
-rw-r--r--  root   root   580   Oct 18  2017  /etc/profile.d/apps-bin-path.sh
-rw-r--r--  root   root   663   May 18  2016  /etc/profile.d/bash_completion.sh
-rw-r--r--  root   root   1003  Dec 29  2015  /etc/profile.d/cedilla-portuguese.sh
-rwxr-xr-x  root   root   301   Feb 20  2013  /etc/profile.d/jdk.csh
-rwxr-xr-x  root   root   299   Feb 20  2013  /etc/profile.d/jdk.sh
-rw-r--r--  root   root   1941  Mar 16  2016  /etc/profile.d/vte-2.91.sh

real	0m0.760s
user	0m0.754s
sys 	0m0.020s
```

Notice how the heading tells you the last time files were indexed. If you can't find the file you are looking for and, was created before that time, simply run `sudo updatedb`.

The `time` command is used again so you can see that using `llocate` is marginally slower than `locate` unless a huge number of results are returned.


----------


<a id="hdr1"></a>
<div class="hdr-bar">  <a href="#hdr2">Skip</a></div>

# `locate` GUI front-end `glocate`

Although `locate` is a CLI command I've created a GUI front for it using `zenity`. This is an initial "no frills" front-end that could be improved using `yad` instead.

## Enter up to 10 search file names / directory names

This screen appears when you start `glocate`:

[![glocate 1.png][1]][1]

You can enter directory names and filenames in whole or in part.


<a id="hdr2"></a>
<div class="hdr-bar">  <a href="#">Top</a>  <a href="#hdr1">ToS</a>  <a href="#hdr3">Skip</a></div>

## Results returned in scroll box

`glocate` takes about a second to display the results in most cases:

[![glocate 2.png][2]][2]


<a id="hdr3"></a>
<div class="hdr-bar">  <a href="#">Top</a>  <a href="#hdr2">ToS</a>  <a href="#hdr4">Skip</a></div>

## Bash Script

Here is the bash script you can create using:

``` bash
sudo -H gedit /usr/local/bin/glocate
```

Then copy and paste the following line:

{% include copyHeader.html %}
``` bash
#!/bin/bash

# NAME: glocate
# PATH: /usr/local/bin
# DESC: Provide zenity GUI front end to locate command

# DATE: Dec 24, 2018.

# NOTE:	Written for: https://askubuntu.com/questions/1104069/search-is-useless-how-can-i-force-it-to-index-my-hard-drive-2018/1104112#1104112

Init () {
    # Get date `sudo updatedb` was last run
    LastRun=$(stat --printf=%y /var/lib/mlocate/mlocate.db | sed 's/\.[^\n]*//')
    SearchMax=10    # Search for up to 10 filenames or directories at once
}

GetSearchNames () {

    SearchNames=$(zenity \
        --title "glocate - updatedb last run: $LastRun" \
        --text '<span foreground="blue" font="14">Enter up to 10 search names</span>' \
        --forms --width=800 --height=480 \
        --add-entry="Search 1" --add-entry="Search 2" --add-entry="Search 3" \
        --add-entry="Search 4" --add-entry="Search 5" --add-entry="Search 6" \
        --add-entry="Search 7" --add-entry="Search 8" --add-entry="Search 9" \
        --add-entry="Search 10" 2>/dev/null)

    Action="$?" # Glitch: When ESC pressed or Cancel clicked result is 0?
    # echo "Action: $Action" # Remove leading # to debug

    # Zenity not returning array like yad would. Build array manually
    SearchArr=() # Reset array
    for (( i=1; i<=$SearchMax; ++i)) ; do
        Field="$(echo "$SearchNames"| cut -d '|' -f $i)"
        [[ $Field != "" ]] && SearchArr+=("$Field")
    done

    # Click OK without search names?
    CharacterCount=$(wc -c <<< "${SearchNames[@]}")
    # echo "CharacterCount: $CharacterCount" # Remove leading # to debug
    # if [[  "$Action" == 0 && "$CharacterCount" == "$SearchMax" ]] ; then
    if [[ "$CharacterCount" -le "$SearchMax" ]] ; then
        zenity  --error --title="glocate" \
                --text="No search names entered. Program will end." \
                2>/dev/null
        Action=99
    fi
    return "$Action"  # 0 = Proceed with search, anything else = quit.
}

DisplaySearch () {

    Result=$(locate "${SearchArr[@]}" )

    zenity \
        --title "locate search results" \
        --text '<span foreground="blue" font="14">Scroll to see more results</span>' \
        --list --separator="$IFS" --width=800 --height=480 \
        --hide-header --column "Directory and filenames" \
        "${Result[@]}" 2>/dev/null
}

Main () {

    Init
    while GetSearchNames ; do DisplaySearch ; done

}

Main
```

Save the file and exit `gedit`.

Mark the script as executable using:

``` bash
sudo chmod a+x /usr/local/bin/glocate
```

If you want to create a desktop shortcut see: [An easy way to create a desktop shortcut?](An easy way to create a desktop shortcut?)

To call the script from the terminal simply use: `glocate`.

  [1]: https://i.stack.imgur.com/5bdDW.png
  [2]: https://i.stack.imgur.com/HkiHQ.png


<a id="hdr4"></a>
<div class="hdr-bar">  <a href="#">Top</a>  <a href="#hdr3">ToS</a></div>

