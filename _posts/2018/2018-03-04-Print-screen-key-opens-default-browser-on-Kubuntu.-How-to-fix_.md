---
layout:       post
title:        >
    Print screen key opens default browser on Kubuntu. How to fix?
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/1011841
type:         Answer
tags:         kubuntu 17.10 plasma-5 ksnapshot
created_date: 2018-03-04 17:13:35
edit_date:    
votes:        "4 "
favorites:    
views:        "423 "
accepted:     Accepted
uploaded:     2025-05-24 22:53:28
git_md_url:   https://github.com/pippim/pippim.github.io/blob/main/_posts/2018/2018-03-04-Print-screen-key-opens-default-browser-on-Kubuntu.-How-to-fix_.md
toc:          false
navigation:   false
clipboard:    false
---

As per this Q&A: [The print screen key does not open the screen shot tool in Kubuntu 16.10](The print screen key does not open the screen shot tool in Kubuntu 16.10)

Follow these steps:

Kubuntu 16.10 replaces the old screen shot tool [KSnapshot][1] with [Spectacle][2] but does not change the keyboard setting accordingly. Under [System Settings -> Shortcuts -> Custom Shortcuts][3] the folder "Screenshots" must be developed to show an entry "Start Screenshot Tool". The trigger for this entry must be set to be the print screen key. A dialog will prompt warning that the key is already assigned; it is assigned to KSnapshot; therefore ignore the warning.


  [1]: https://www.kde.org/applications/graphics/ksnapshot/
  [2]: https://www.kde.org/applications/graphics/spectacle/
  [3]: https://userbase.kde.org/System_Settings/Shortcuts_and_Gestures#Custom_Shortcuts
