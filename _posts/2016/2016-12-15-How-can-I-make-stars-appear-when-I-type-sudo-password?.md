---
layout:       post
title:        >
    How can I make stars appear when I type sudo password?
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/860767
type:         Answer
tags:         command-line sudo password
created_date: 2016-12-15 03:10:27
edit_date:    
votes:        "7 "
favorites:    
views:        "1,267 "
accepted:     Accepted
uploaded:     2022-01-07 19:17:03
toc:          false
navigation:   false
clipboard:    true
---

After entering `sudo` at the Terminal if you want stars / asterisks to appear with each password character you type you need to configure it using:

``` 
sudo visudo

```

Locate the line containing `env_reset` and add the parameter `, pwfeedback` behind it.  Here is an example:

{% include copyHeader.html %}
``` 
  GNU nano 2.5.3                      File: /etc/sudoers.tmp                                          Modified  

#
# This file MUST be edited with the 'visudo' command as root.
#
# Please consider adding local content in /etc/sudoers.d/ instead of
# directly modifying this file.
#
# See the man page for details on how to write a sudoers file.
#
Defaults        env_reset, timestamp_timeout=120, pwfeedback
Defaults        mail_badpass
Defaults        secure_path="/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin:/snap/bin"

# Host alias specification

# User alias specification

# Cmnd alias specification

# User privilege specification

^G Get Help     ^O Write Out    ^W Where Is     ^K Cut Text     ^J Justify      ^C Cur Pos      ^Y Prev Page
^X Exit         ^R Read File    ^\ Replace      ^U Uncut Text   ^T To Spell     ^_ Go To Line   ^V Next Page

```

After making changes save the file using <kbd>Ctrl</kbd>+<kbd>O</kbd> to write the file. You will be prompted for the file name but simply press <kbd>Enter</kbd> to accept the default. After saving, exit the editor using <kbd>Ctrl</kbd>+<kbd>X</kbd>.

Also on this example the timeout value has been set to 120 minutes (2 hours) so that you aren't constantly prompted for `sudo` password every 15 minutes. You can leave this option out if you like or increase / decrease it as you like.
