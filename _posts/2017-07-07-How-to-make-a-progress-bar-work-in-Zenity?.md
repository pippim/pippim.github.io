---
layout:       post
title:        How to make a progress bar work in Zenity?
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/932774
type:         Answer
tags:         bash zenity
created_date: 2017-07-07 02:00:08
edit_date:    
votes:        2
favorites:    
views:        11,355
accepted:     
uploaded:     2021-12-28 20:06:53
toc:          false
navigation:   false
clipboard:    true
---

The way `zenity` works for displaying progress bars is capturing your `echo` commands from your `bash` script via the `|` (pipe) redirection command (symbol).

Here is an example you can try that I lifted from [Ubuntu Forums][1]:



{% include copyHeader.html %}
``` bash
#!/bin/bash

# Force Zenity Status message box to always be on top.


(
# =================================================================
echo "# Running First Task." ; sleep 2
# Command for first task goes on this line.

# =================================================================
echo "25"
echo "# Running Second Task." ; sleep 2
# Command for second task goes on this line.

# =================================================================
echo "50"
echo "# Running Third Task." ; sleep 2
# Command for third task goes on this line.

# =================================================================
echo "75"
echo "# Running Fourth Task." ; sleep 2
# Command for fourth task goes on this line.


# =================================================================
echo "99"
echo "# Running Fifth Task." ; sleep 2
# Command for fifth task goes on this line.

# =================================================================
echo "# All finished." ; sleep 2
echo "100"


) |
zenity --progress \
  --title="Progress Status" \
  --text="First Task." \
  --percentage=0 \
  --auto-close \
  --auto-kill

(( $? != 0 )) && zenity --error --text="Error in zenity command."

exit 0

```

If you follow the link to ***Ubuntu Forums*** you can read a discussion of this script. If after that you still have questions please ask via comment below and I'll do my best to answer them for you.

  [1]: https://ubuntuforums.org/showthread.php?t=2172828
