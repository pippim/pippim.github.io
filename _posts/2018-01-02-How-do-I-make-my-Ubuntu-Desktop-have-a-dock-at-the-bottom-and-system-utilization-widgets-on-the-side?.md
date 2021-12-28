---
layout:       post
title:        How do I make my Ubuntu Desktop have a dock at the bottom and system utilization widgets on the side?
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/991480
type:         Answer
tags:         appearance conky
created_date: 2018-01-02 11:50:18
edit_date:    2020-06-12 14:37:07
votes:        8
favorites:    
views:        2,761
accepted:     Accepted
uploaded:     2021-12-28 13:55:01
toc:          false
navigation:   false
clipboard:    false
---

# Move launcher from side to bottom

Assuming you don't want to install a totally new desktop, you can simply move the launcher from the side to the bottom with this command:

``` 
gsettings set com.canonical.Unity.Launcher launcher-position bottom

```

[Reference][1]


----------

# Use Conky to display time

As mentioned in comments the time is most likely created using Conky. You can find many examples on setting up Conky in [Ubuntu Forums][2]. Here is my humble Conky display:

[![Conky Realtime Network 4][3]][3]

Someone commented in jest about making Conky run at 60Hz. I thought it would be fun to try so changed the refresh rate from .75 times per second to .0167 times per second which is about 60 Hz or 60 Frames Per Second:

[![Conky 60hz.gif][4]][4]

Sorry about the hole in the middle it normally has nVidia GPU information but I've booted with Intel iGPU and am trying to find out how to get performance statistics on it.

Notice how Conky CPU percentage jumps from .5% at normal speed to about 5% at 60Hz speed. Also note my browser doesn't refresh the screen as fast as the .gif that is running (it's about 3 to 4 times slower?).

  [1]: http://ubuntuhandbook.org/index.php/2016/03/ubuntu-16-04-move-unity-launcher-to-bottom/
  [2]: https://ubuntuforums.org/showthread.php?t=281865
  [3]: https://i.stack.imgur.com/qbwY3.gif
  [4]: https://i.stack.imgur.com/kFcfr.gif
