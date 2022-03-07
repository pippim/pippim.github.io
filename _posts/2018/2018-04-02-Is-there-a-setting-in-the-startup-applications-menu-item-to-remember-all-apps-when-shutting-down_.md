---
layout:       post
title:        >
    Is there a setting in the startup applications menu item to remember all apps when shutting down?
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/1021436
type:         Answer
tags:         shutdown session
created_date: 2018-04-02 21:21:59
edit_date:    2018-04-02 21:27:59
votes:        "2 "
favorites:    
views:        "597 "
accepted:     
uploaded:     2022-03-06 19:51:02
git_md_url:   https://github.com/pippim/pippim.github.io/blob/main/_posts/2018/2018-04-02-Is-there-a-setting-in-the-startup-applications-menu-item-to-remember-all-apps-when-shutting-down_.md
toc:          false
navigation:   false
clipboard:    false
---

## Short Answer

If you want to save sessions across reboots you'll have to switch from Lubuntu (LXDE Desktop) to Kubuntu (KDE desktop) or Xubuntu (XFCE desktop).

It won't work on Ubuntu (Unity Desktop).

----------

## Long Answer

Using this tool I recently wrote: [Bash one-liner to display ALL `gsettings` in Zenity or Yad][1]. I sorted on `Key` and scrolled to the `A` section to find:

[![auto save session.png][2]][2]

**Note:** Many people will prefer to install [`dconf-editor`][3] to navigate to the `gsettings` and set the values.

To manually find the states use:

``` 
$ gsettings get org.gnome.SessionManager auto-save-session
false
$ gsettings get org.gnome.SessionManager auto-save-session-one-shot
false
```

To save the session for across reboots use:

``` 
gsettings set org.gnome.SessionManager auto-save-session true
```

Then reboot.

**Note:** This doesn't work in Ubuntu 16.04 but does in Kubuntu.

Someone recommended [here][4] to use Compiz Session Management:

[![Compiz session management.png][5]][5]

but it doesn't appear to work in Ubuntu 16.04 either.


  [1]: {% post_url /2018/2018-03-18-Bash-one-liner-to-display-ALL-_gsettings_-in-GUI-dialog-window %}
  [2]: https://i.stack.imgur.com/IbmaX.png
  [3]: https://packages.ubuntu.com/trusty/utils/dconf-editor
  [4]: https://askubuntu.com/a/719602/307523
  [5]: https://i.stack.imgur.com/HPFfO.png
