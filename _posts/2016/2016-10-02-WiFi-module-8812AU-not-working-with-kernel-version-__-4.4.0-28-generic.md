---
layout:       post
title:        >
    WiFi module 8812AU not working with kernel version >= 4.4.0-28-generic
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/832379
type:         Answer
tags:         networking drivers wireless additional-drivers
created_date: 2016-10-02 22:57:36
edit_date:    
votes:        "0 "
favorites:    
views:        "14,776 "
accepted:     
uploaded:     2023-12-31 10:24:11
git_md_url:   https://github.com/pippim/pippim.github.io/blob/main/_posts/2016/2016-10-02-WiFi-module-8812AU-not-working-with-kernel-version-__-4.4.0-28-generic.md
toc:          false
navigation:   false
clipboard:    false
---

I preach you should use kernel modules that are fully signed and compiled to the right version... then I sin and force a module in that I can't figure out how to sign (I'm security-challenged). Indeed before learning dkms I think I must have digressed and forced the wrong kernel version in before (but hey it still worked!).

You might find yourself in the same situation. Anyway using `modprobe` you can install an unsigned kernel module by adding these parameters:

	-f, --force                 Force module insertion or removal.
	                            implies --force-modversions and
	                            --force-vermagic
	    --force-modversion      Ignore module's version
	    --force-vermagic        Ignore module's version magic

Of course I preach you should never do this, but then again....





