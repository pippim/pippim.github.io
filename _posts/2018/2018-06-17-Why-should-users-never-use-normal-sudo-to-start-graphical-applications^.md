---
layout:       post
title:        >
    Why should users never use normal sudo to start graphical applications?
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/1047413
type:         Answer
tags:         sudo gui gksu
created_date: 2018-06-17 18:15:48
edit_date:    2020-06-12 14:37:07
votes:        "15 "
favorites:    
views:        "32,159 "
accepted:     
uploaded:     2022-01-14 05:39:48
git_md_url:   https://github.com/pippim/pippim.github.io/blob/main/_posts/2018/2018-06-17-Why-should-users-never-use-normal-sudo-to-start-graphical-applications^.md
toc:          false
navigation:   false
clipboard:    false
---

## Ubuntu 19.10 update

As of [Ubuntu 19.10][1], typing `sudo some_command` now has the same effect as typing `sudo -H some_command`. This means the directory for any configuration files touched will be under `/root` directory and not `/home/regular_userID` directory (aka `$HOME`).

This makes this whole Q&A a moot point to a large degree for Ubuntu 19.10 users and greater.

To see whether `sudo` is working like `sudo -H` in your distribution try these short tests:

``` 
$ sudo printenv | grep HOME
HOME=/home/rick

$ sudo -H printenv | grep HOME
HOME=/root

```

As you can see, `sudo` above does not perform like `sudo -H` so using plain `sudo` can harm your user configuration files.

----------


An alternative to `gksu nautilus`, `gksu gedit` or `sudo -H gedit` is to use the `nautilus-admin` add-on. It allows you to browse files and directories with **Nautilus** and then open them as root (Administrator).

Installation is straight forward:

``` 
sudo apt install nautilus-admin

```

Now when you are in Nautilus you'll have an extra option to Edit as administrator:

[![nautilus admin.gif][2]][2]


----------

## `gedit` as root doesn't allow preferences

When you run `gedit` as root you can't use the preferences you've set up as a regular user for tab stops, convert tabs to spaces, font name, font size, line wrap, etc.

To solve this I've written the script `sgedit` to inherit user preferences and apply them to root: [How can I sync my root gedit with my user gedit&#39;s preferences?](How can I sync my root gedit with my user gedit&#39;s preferences?)


-    Call using `sgedit filename1 filename2 ...`
-    Gets user's gedit settings for tab stops, fonts, line-wrap, etc.
-    Elevates to `sudo -H` to preserve file ownership whilst getting root powers.
-    Requests password if last `sudo` has timed out.
-    Gets sudo's gedit settings
-    Compares differences between user and sudo gedit settings
-    Runs gsettings set on the differences only (reduces 174 set commands to a dozen or less. Next time it's run perhaps only one or two changes but often times no changes.
-    Calls `gedit` as a background task such that terminal prompt reappears immediately.


  [1]: https://lists.ubuntu.com/archives/ubuntu-devel-discuss/2019-May/018345.html
  [2]: https://i.stack.imgur.com/HAqmQ.gif
