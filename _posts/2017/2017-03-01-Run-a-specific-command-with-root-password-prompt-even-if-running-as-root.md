---
layout:       post
title:        >
    Run a specific command with root password prompt even if running as root
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/888467
type:         Answer
tags:         command-line password root rm
created_date: 2017-03-01 12:00:12
edit_date:    2017-04-13 12:23:52
votes:        "8 "
favorites:    
views:        "1,912 "
accepted:     
uploaded:     2022-03-27 10:04:10
git_md_url:   https://github.com/pippim/pippim.github.io/blob/main/_posts/2017/2017-03-01-Run-a-specific-command-with-root-password-prompt-even-if-running-as-root.md
toc:          false
navigation:   false
clipboard:    true
---

You can use this code for `rm` wrapper script but you might want to create similar versions for `mv` and `find` as well. 


----------


**Edit** Mar 5 2017 - Change method of checking when running in terminal.


----------


This answer checks if running at the terminal and does not prompt for password if running in a background script such as startup, cron or GUI. The script can be improved to ensure `rm` was typed directly in the terminal. Then if another script like `sudo update-grub` or `sudo apt update` called `rm` a second password would not be required.

I've written a script to password protect `rm` like the OP requested and the code below is the same except it demands password from sudo / root user. It also has edits to prevent you from accidentally deleting:

 - /
 - /home
 - /bin

## Create the script

Use `gksu gedit /usr/local/bin/rm` and copy in these lines:



{% include copyHeader.html %}
``` bash
#!/bin/bash

tty -s;
if [ "0" == "$?" ]; then Terminal="Y"; else Terminal="N"; fi

if [ $Terminal == "Y" ] ; then    

    # Running from terminal don't allow delete of / or /toplevel directory even if sudo
    for i in ${@:1}
    do
        # Skip options -i -r -v -d 
        if [[ ${i:0:1} != "-" ]] ; then
            # if parameter doesn't begin with '-' it's file or directory, so get real path.
            fullname=$(realpath "$i" 2>&1) # No error messages if file doens't exist
            # We must have at least two `/` in the full path
            levels=$(echo "$fullname" | tr -cd '/' | wc -c)
            if (( $levels == 1 )); then # Test for 1, will be zero when file doesn't exist.
                echo "Attempting to remove top level directory '$fullname'"
                echo "Use 'sudo /bin/rm $@' instead."
                exit 1 # error
            fi
        fi
    done
fi


if [ $Terminal == "Y" ] ; then    
# Only running from a terminal needs password (ie not cron)

    # log rm usage to /var/log/syslog
    PARENT_COMMAND="$(ps -o comm= $PPID)"   
    logger "$PARENT_COMMAND"" - rm command was used on file: ""$fullname"

    # Get password
    Password=$(zenity --password --title="Password for rm")
    encryptPassword=$(echo -n "$Password" | md5sum)

echo "md5sum: $encryptPassword" # Comment out after viewing one time and updating line below.

    if [[ "$encryptPassword" != "d2c30dc65e59558c852ea30b7338abbe  -" ]]; then
        echo "Invalid password!"
        exit 1
    fi

fi # non-terminals can't enter password.
    
# Call REAL rm command with parameters passed to this wrapper sript
/bin/rm "$@"
    
exit 0
```

Change the password "WE2U" to anything you like and save the file.

## Mark new `rm` script as executable

Flag new `rm` script as executable using:

``` bash
sudo chmod +x /usr/local/bin/rm
```

## How it Works

[![rm password][1]][1]

Unless the password is ***WE2U***, the first time you run the script you will get "invalid password" and the encryption key for the password you entered is displayed. Copy and paste this encryption key from the terminal into the script. Then comment out the line with the echo that displayed the encryption key on the terminal.

Because the path `/usr/local/bin` is higher on the list than `/bin` our command `rm` is called. After getting valid password it calls `/bin/rm` to do the real removal.

The script calls `logger` to record every time `rm` was manually called using the terminal. Command usage is recorded to `/var/log/syslog`.

Taken from the answer posted at ([How can I set up a password for the &#39;rm&#39; command?][2]) and modified to demand password from root user too.


  [1]: https://i.stack.imgur.com/HvKlZ.png
  [2]: {% post_url /2016/2016-12-30-How-can-I-set-up-a-password-for-the-_rm_-command_ %}
