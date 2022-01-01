---
layout:       post
title:        >
    Having to run command `sudo modprobe brcmfmac` every time I restart in order to get wifi working
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/965141
type:         Answer
tags:         wireless asus executable
created_date: !!str "2017-10-15 15:51:02"
edit_date:    !!str "2020-06-12 14:37:07"
votes:        !!str "4"
favorites:    
views:        !!str "4,698"
accepted:     Accepted
uploaded:     !!str "2021-12-31 19:06:59"
toc:          false
navigation:   false
clipboard:    false
---

# Your card is blacklisted

You have to run `sudo modprobe brcmfmac` because it is blacklisted. You can tell this when you ran the command:

``` 
$ sudo grep brcmfmac /etc/modprobe.d/*
etc/modprobe.d/blacklist-custom.conf:blacklist brcmfmac

```

In order to "whitelist" your card you need to use sudo powers to edit `etc/modprobe.d/blacklist-custom.conf`. Then:

- Find the containing `blacklist brcmfmac`
- Insert a `#` in front of it.
- Save the file

Now when you reboot you shouldn't have to type `sudo modprobe brcmfmac` anymore.

Thanks to [Jeremy31](https://askubuntu.com/users/300665/jeremy31) for recommending shorter version of my original answer. If yuou like this shorter answer please click on his name link find another answer of his you find helpful and upvote it.

Please note there is a reason your card was blacklisted in the first place and if you have additional problems you might have to download source for a different driver and compile it using DKMS.
