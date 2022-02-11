---
layout:       post
title:        >
    Plugging network adapter in causes system to freeze
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/810777
type:         Answer
tags:         networking wireless hardware
created_date: 2016-08-11 01:08:41
edit_date:    2016-08-11 01:13:50
votes:        "1 "
favorites:    
views:        "51 "
accepted:     Accepted
uploaded:     2022-02-11 06:08:50
git_md_url:   https://github.com/pippim/pippim.github.io/blob/main/_posts/2016/2016-08-11-Plugging-network-adapter-in-causes-system-to-freeze.md
toc:          false
navigation:   false
clipboard:    false
---

After rebooting you can press Control key, Alt Key and T key simultaneously to invoke the terminal. Then type:

``` 
dmesg
```

Scroll back through the most recent boot messages to the last messages when your system died. Copy and paste relevant error messages under a new thread "what does this error message mean?"

If dmesg doesn't provide any clues. Start up Nautilus (the file manager in Ubuntu). In the left pane select "Computer". Then on the right pane select the directory icon "var". Then select the icon "log". Then scroll down and double click on "syslog" (not syslog.1 .2 or.3, etc). Hold down the Control Key and press the End Key to go to the bottom of the file. Then scroll back to the time of the freeze and look for errors there.

What is the make and model of the wireless adapter? What is the make and model of your computer? These are relevant facts that a quick google search might answer.
