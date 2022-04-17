---
layout:       post
title:        >
    How can Bash script kill "sleeping" version of itself already running?
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/848796
type:         Answer
tags:         bash scripts process
created_date: 2016-11-13 03:10:08
edit_date:    2017-04-13 12:23:38
votes:        "2 "
favorites:    
views:        "1,201 "
accepted:     Accepted
uploaded:     2022-04-17 17:56:59
git_md_url:   https://github.com/pippim/pippim.github.io/blob/main/_posts/2016/2016-11-13-How-can-Bash-script-kill-_sleeping_-version-of-itself-already-running_.md
toc:          false
navigation:   false
clipboard:    false
---

Having spent many hours following the white rabbit into various alternate universes, I found the following to be the only reliable method is:

``` 
# If called a second time, kill the first version already running
kill $(pgrep -f "${0##*/}" | grep -v ^$$)
```


If you are interested in testing this see `Lock Screen Timer` code in *Ask Ubuntu* at: 
([Application that will lock screen after a set amount of time for Ubuntu][3])

# Production version code snippet (TL;DR)

The pertinent code snippet from the `lock-screen-timer` program is this:

``` 
# Check if lock screen timer already running
pID=$(pgrep -f "${0##*/}") # All PIDs matching lock-screen-timer name
PREVIOUS=$(echo "$pID" | grep -v ^"$$") # Strip out this running copy ($$$)
if [ $PREVIOUS != "" ]; then
    zenity --info --title="Lock screen timer already running" --text="Previous lock screen timer has been terminated."
    kill "$PREVIOUS"
fi
```

### `pgrep -f "${0##*/}"`

This finds all occurrences of the same named running program ID `${0##*/}`. Although the executable file is called `~/bin/lock-screen-timer` a desktop shortcut is used to call it. That can be named "Lock Screen Timer" or "Lock screen timer" or "Remind me of laundry cycle". It can't be hard-coded into the program as in the original question.

The resulting list of process id's are put in the variable `$pID`

### `echo "$pID" | grep -v ^"$$"`

This takes the contents of `$pID` (all running occurrences of `lock-screen-timer`, or it's renamed desktop short cut) and pipes the list of process id's into the next command using the pipe (`|`) character.

The next command `grep -v` removes process ID's that match `$$` which is the current running process ID. The carrot (`^`) tells grep to match the whole word not the character string. For example, the current process id may be `1518` and the previous version may be `11518`, `21518` or `31518`. In that case just matching on 4 digits the process id makes those 3 matches because `1518` is within `11518`. The carrot matches on words so `1518` <> `11518`. In the process id list the words are separated by spaces (in a variable) or new line characters (when `ps -aux` command displays them on screen).

The result of these two commands is the process ID of the previously running `lock-screen-timer` script. The process ID is put into the variable `$PREVIOUS`. If there wasn't a previous ID the value will be "" (null field).

### `if [ $PREVIOUS != "" ]; then`

This tests if `$PREVIOUS` is not equal to (`!=`) a null / empty field `""`. Obviously we can only kill a previously running process ID if we have one!

### `zenity --info --title="Lock screen timer already running" ...`

When running a desktop shortcut you can't `echo` messages to the user because the GUI won't display them. They end up in `/var/log/syslog` and you have to display them with `cat` or `gedit`, etc.

`zenity` is a nice little program to display dialog boxes and forms from bash to the `GUI` (Graphical User Interface), aka Desktop. The message text goes on to say *Previous lock screen timer has been terminated.*. This allows the user to start a new timer countdown or simply cancel. In essence calling the script a second time and aborting is how you can kill the first script already running.

### `kill "$PREVIOUS"`

This simply kills the previously running version which we want to do whether we start a new `lock-screen-timer` countdown or not. This is substantially different from the original question because we've put the results of two cryptic commands into the single variable called `$PREVIOUS`.

  [1]: https://askubuntu.com/users/231142/terrance
  [2]: https://askubuntu.com/users/295286/serg
  [3]: {% post_url /2016/2016-10-14-Application-that-will-lock-screen-after-a-set-amount-of-time-for-Ubuntu %}


