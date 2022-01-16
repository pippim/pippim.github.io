---
layout:       post
title:        >
    Setting gmail as default for sending files via email
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/936540
type:         Answer
tags:         libreoffice email thunderbird empathy gmail
created_date: 2017-07-15 22:42:06
edit_date:    2017-07-16 17:39:31
votes:        "3 "
favorites:    
views:        "2,116 "
accepted:     Accepted
uploaded:     2022-01-15 17:41:50
git_md_url:   https://github.com/pippim/pippim.github.io/blob/main/_posts/2017/2017-07-15-Setting-gmail-as-default-for-sending-files-via-email.md
toc:          false
navigation:   false
clipboard:    false
---

After you install [gnome-gmail][1] or [desktop-webmail][2] for Ubuntu 16.04 you need to set it as the default mail application. Some instructions online say to go to `Applications` - `Internet` but that is for older versions. For Ubuntu 16.04 you need to go to `System Settings` -> `Details` -> `Default Applications` where you will be greeted with this screen:

[![System Settings Details Default Applications][3]][3]

The second option **Mail** will contain these options (after installation steps in the question):

 - Thunderbird
 - Gnome Gmail
 - Desktop Webmail

In the example above `Gnome Gmail` has been selected as the default mail application. Now when you click to send files in LibreOffice gmail will be used instead of Thunderbird configuration popping up.

  [1]: https://davesteele.github.io/gnome-gmail/
  [2]: https://packages.ubuntu.com/xenial/desktop-webmail
  [3]: https://i.stack.imgur.com/wmhdd.png
