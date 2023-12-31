---
layout:       post
title:        >
    Do we engage in too much `gksu` bashing?
site:         Ask Ubuntu Meta
stack_url:    https://meta.askubuntu.com/q/17687
type:         Question
tags:         discussion
created_date: 2018-02-18 22:50:50
edit_date:    2020-06-12 14:35:34
votes:        "8 "
favorites:    
views:        "304 "
accepted:     
uploaded:     2023-12-31 10:24:11
git_md_url:   https://github.com/pippim/pippim.github.io/blob/main/_posts/2018/2018-02-18-Do-we-engage-in-too-much-_gksu_-bashing_.md
toc:          false
navigation:   false
clipboard:    false
---

I can't count the number of times I've seen bashing of answers which contain:

``` 
gksu gedit /rootpath/rootfile.conf
```

Yesterday (February 17, 2018) Live Wire updated an article on [how to setup gksu][1]. The author acknowledges that `gksu` is frowned upon but claims no viable alternative is available for the GUI.

So should we tone down bashing people who do use `gksu`? Or tone down bashing of anything else for that matter when there is no viable alternative? Don't get me wrong, I like to bash politicians from time to time so I'm not totally against bashing.

FTR I did setup a wrapper script called `gsu` which invoked policy kits to call `gedit` and `nautilus` under Ubuntu 16.04 but can understand how not everyone will do that.


----------

## Rolled-up comments

Mr. Ward recommended `pkexec` which I use in my `gsu` wrapper script to replace `gksu`. But do we want to revisit every Q&A >= Ubuntu 16.04 containing `gksu` and explain how to setup Policy Kits?

Ms. Zanna recommended `sudo -H gedit ...` and I have seen that recommended a couple of times when someone is using `gksu`. But again who wants to post that comment on all the Q&A's >= Ubuntu 14.04 (the historical version not EOL) that reference `gksu`?

It's important to note I'm not going around promoting `gksu gedit` because I've been chastised for that in the past. Now I just say "using your favorite editor with sudo powers edit this file". It is the article above that is promoting `gksu`. Due to this new promotion you will see more new users using `gksu`.

So it is yesterday's article promoting `gksu` (and not me!) begging the question should we be "tone down" bashing people who use `gksu` in their question or answer? Old timers know better than to say `gksu` but new people don't and we should be embracing new users and not making them feel unwelcome.

Maybe there is a Q&A already of substitutes to `gksu` we can link-reference via comment section as a subtle hint instead?

I started out on punch-cards and then moved up to text based IBM and DEC VAX monochrome green or amber terminals before finally landing in this 32-bit colour, Full HD, GUI-Universe. Personally I quite like the new GUI-verse and only use `nano` or `crontab -e` when I absolutely have to.

That said I don't want to be the punching bag for everyone else that likes `gedit` :)

  [1]: https://www.lifewire.com/what-is-gksu-2189402
