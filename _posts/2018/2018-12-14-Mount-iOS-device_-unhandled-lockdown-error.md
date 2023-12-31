---
layout:       post
title:        >
    Mount iOS device: unhandled lockdown error
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/1100773
type:         Answer
tags:         usb mount iphone ipad ios
created_date: 2018-12-14 03:03:10
edit_date:    2020-06-12 14:37:07
votes:        "0 "
favorites:    
views:        "3,348 "
accepted:     
uploaded:     2023-12-31 10:24:11
git_md_url:   https://github.com/pippim/pippim.github.io/blob/main/_posts/2018/2018-12-14-Mount-iOS-device_-unhandled-lockdown-error.md
toc:          false
navigation:   false
clipboard:    false
---

I've been waiting for someone to answer with first hand experience. As no one has I'll post an answer with what I've discovered.

[iOS 11 ideviceinstaller, ideviceinfo not working #510][1]:

- This is a very long support thread with many contributors
- General agreement is need to recompile `idevice.c`
- A patch has been created [here][2]

I'm using Android so cannot test how Apple works.

  [1]: https://github.com/libimobiledevice/libimobiledevice/issues/510
  [2]: https://gist.github.com/nikias/b351bf633d62703e0ff4f2fee9628401
