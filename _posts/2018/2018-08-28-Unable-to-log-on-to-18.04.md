---
layout:       post
title:        >
    Unable to log on to 18.04
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/1069579
type:         Answer
tags:         18.04 login password
created_date: 2018-08-28 00:08:34
edit_date:    2020-11-23 11:48:00
votes:        "3 "
favorites:    
views:        "2,248 "
accepted:     
uploaded:     2022-04-11 05:56:55
git_md_url:   https://github.com/pippim/pippim.github.io/blob/main/_posts/2018/2018-08-28-Unable-to-log-on-to-18.04.md
toc:          false
navigation:   false
clipboard:    false
---

# Console access has changed in 18.04

You converted from 16.04 to 18.04 and cannot log into TTY. See this: [How do I switch between console mode and GUI in 17.10 and newer?](How do I switch between console mode and GUI in 17.10 and newer?)

- In **16.04** you could press <kbd>Ctrl</kbd>+<kbd>Alt</kbd>+<kbd>F1</kbd> for **console** (as you call `tty`) and <kbd>Ctrl</kbd>+<kbd>Alt</kbd>+<kbd>F7</kbd> for **GUI**.
- In **18.04** pressing <kbd>Ctrl</kbd>+<kbd>Alt</kbd>+<kbd>F1</kbd> brings up the **GUI** and <kbd>Ctrl</kbd>+<kbd>Alt</kbd>+<kbd>F3</kbd> to <kbd>Ctrl</kbd>+<kbd>Alt</kbd>+<kbd>F7</kbd> brings up the **console** (tty).


----------

# Four new Desktop environments were added in 18.04

When upgrading **16.04** to **18.04** you can get five different sign in options for different desktop environments:

[![Ubuntu 18.04 five desktops.jpg][1]][1]

- Key in your password but **do not press** <kbd>Enter</kbd>.
- Click the gear icon next to the <kbd>Sign In</kbd> button.
- The drop down menu pictured above will now appear.
- When upgrading from 16.04 to 18.04 you'll want to select the highlighted option **Unity**
- The drop down menu will close and now you can press <kbd>Enter</kbd> for the password to be accepted.


----------

# Invalid password login loop in 18.04

There was a bug where if you entered the password incorrectly the first time, you could not successfully enter it until rebooting:

- May 06, 2018 - [Can't login on 18.04 after entering wrong password][2]
- April 19, 2018 - [(regression) Ubuntu 18.04 login screen rejects a valid password on first attempt (if starting with Shift key). Usually works on the second attempt][3]
- July 25, 2018 - [Ubuntu 18.04 on login loop, even with correct password][4]


  [1]: https://i.stack.imgur.com/EG0an.jpg
  [2]: https://bugs.launchpad.net/ubuntu/+source/gdm3/+bug/1769416
  [3]: https://bugs.launchpad.net/ubuntu/+source/gnome-shell/+bug/1765261
  [4]: https://askubuntu.com/questions/1059458/ubuntu-18-04-on-login-loop-even-with-correct-password
