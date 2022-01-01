---
layout:       post
title:        >
    Who is Bastien?
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/931360
type:         Answer
tags:         bluetooth
created_date: !!str "2017-07-02 20:56:37"
edit_date:    !!str ""
votes:        !!str "5"
favorites:    
views:        !!str "1,616"
accepted:     Accepted
uploaded:     !!str "2021-12-31 19:13:18"
toc:          false
navigation:   false
clipboard:    false
---

Wow lots of bug reports on "Bastien's Computer" being in peoples' bluetooth settings. It turns out you can talk to Bastien himself in this bug report: [Visible as “Bastien Nocera's Computer”][1].

The common solution is to use:

``` 
rfkill list

```

and search for:

``` 
#: hci0: Bluetooth
	        Soft blocked: yes
```

	        Hard blocked: no

Then use:

``` 
rfkill unblock #

```

Where `#` is a number like `0`, `1`, `3` or `6`.

If this doesn't solve it or, it only lasts for a single session, you can find other tips from Bastien in the link above.


  [1]: https://bugzilla.gnome.org/show_bug.cgi?id=755967
