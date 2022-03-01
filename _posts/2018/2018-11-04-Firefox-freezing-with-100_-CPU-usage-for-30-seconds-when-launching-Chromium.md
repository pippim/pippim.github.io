---
layout:       post
title:        >
    Firefox freezing with 100% CPU usage for 30 seconds when launching Chromium
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/1089834
type:         Answer
tags:         firefox fonts chromium performance
created_date: 2018-11-04 00:16:18
edit_date:    2020-06-12 14:37:07
votes:        "3 "
favorites:    
views:        "5,229 "
accepted:     
uploaded:     2022-02-28 18:40:03
git_md_url:   https://github.com/pippim/pippim.github.io/blob/main/_posts/2018/2018-11-04-Firefox-freezing-with-100_-CPU-usage-for-30-seconds-when-launching-Chromium.md
toc:          false
navigation:   false
clipboard:    false
---

## Background

It has been proposed this Firefox Bug 1492360: [High CPU usage when open Firefox before chrome/chromium][1]. That is a duplicate of Bug 1495900: [Starting Chrome makes Firefox content processes hang for about two minutes, due to FontConfig font rescanning (FcInitReinitialize)][2], is the culprit.

### But I'm on Firefox too:

[![Firefox version.png][3]][3]

### And when I open up Chrome:

[![Chrome version.png][4]][4]

### I don't see any performance hit to CPUs.

It may be against your morals but perhaps you can try installing `google-chrome-stable` like I have. Then do the test again. If there is no CPU usage spike to 100% then a bug report could be filed between Chromium and Chrome.

I'm on Ubuntu 16.04.5 LTS. Although kernel is currently `4.14.78` LTS chain I don't think that has anything to do with it as I didn't notice CPU hits on previous kernels either.

The only time I see all CPU's at 100% is during `update-initramfs`.

---

## `fontconfig` version

In the bug report it is revealed:

``` 
$ dpkg -l 'fontconfig*' | grep "^ii"
ii  fontconfig        2.12.6-0ubuntu2 amd64        generic font configuration library - support binaries
ii  fontconfig-config 2.12.6-0ubuntu2 all          generic font configuration library - configuration
```

In my non-buggy version (could be because of no local fonts though):

``` 
$ dpkg -l 'fontconfig*' | grep "^ii"
ii  fontconfig        2.11.94-0ubuntu1.1 amd64        generic font configuration library - support binaries
ii  fontconfig-config 2.11.94-0ubuntu1.1 all          generic font configuration library - configuration
```

I'm at `2.11.94` version earlier than bug report `2.12` version. In bug report upgrading to `2.13` is a recommended solution but OP mentioned in comments this isn't possible. As such `2.11.94` **might** be an option.

  [1]: https://bugzilla.mozilla.org/show_bug.cgi?id=1492360
  [2]: https://bugzilla.mozilla.org/show_bug.cgi?id=1495900
  [3]: https://i.stack.imgur.com/ZAVcsm.png
  [4]: https://i.stack.imgur.com/ZxnAjl.png

