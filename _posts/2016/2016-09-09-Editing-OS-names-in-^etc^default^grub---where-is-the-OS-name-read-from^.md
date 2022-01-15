---
layout:       post
title:        >
    Editing OS names in /etc/default/grub - where is the OS name read from?
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/822774
type:         Answer
tags:         dual-boot grub2
created_date: 2016-09-09 02:29:40
edit_date:    2016-09-09 10:55:36
votes:        "2 "
favorites:    
views:        "3,944 "
accepted:     
uploaded:     2022-01-14 19:32:50
git_md_url:   https://github.com/pippim/pippim.github.io/blob/main/_posts/2016/2016-09-09-Editing-OS-names-in-^etc^default^grub---where-is-the-OS-name-read-from^.md
toc:          false
navigation:   false
clipboard:    false
---

**lsb_release** is an internal command to obtain the Linux Distro and version (release number). How the command works and where it gets the information from can be duplicated by you.


In terminal type `cat /proc/version`:

``` 
Linux version 4.7.3-040703-generic (kernel@tangerine) (gcc version 6.2.0 20160901 (Ubuntu 6.2.0-3ubuntu11) ) #201609070334 SMP Wed Sep 7 07:36:45 UTC 2016

```

**Ubuntu** appears in /proc/version but not the way it appears on grub menus. So we move on....


Now type `cat /etc/issue`:

``` 
Ubuntu 16.04.1 LTS \n \l

```

This is where **lsb_release** is probably getting the Linux Distro, because **Ubuntu 16.04.1 LTS** is what appears on my grub menu.


Before indirectly affecting the variable **$GRUB_DISTRIBUTOR** (referenced in your question) by forcing **/etc/issue** to a different constant, consider this code within `/etc/grub.d/05_debian_theme`:

``` 
set_default_theme(){
	case $GRUB_DISTRIBUTOR in
		Tanglu|Ubuntu|Kubuntu)
			# Set a monochromatic theme for Tanglu/Ubuntu.
			echo "${1}set menu_color_normal=white/black"
			echo "${1}set menu_color_highlight=black/light-gray"

```


Changing *Ubuntu* to *My Cool Linux* might appear on the menu okay but internal grub code for themes and coloring would be broken above. Not to mention all the other "things" that might break inside grub plus outside in your other applications and the OS.

**Edit 1:**

As I learned this morning at [command-to-show-linux-version][1] and then discovered @Zanna has already given an excellent answer above, the command **lsb_release** retrieves text from `/etc/lsb-release`.


  [1]: http://www.cyberciti.biz/faq/command-to-show-linux-version/
