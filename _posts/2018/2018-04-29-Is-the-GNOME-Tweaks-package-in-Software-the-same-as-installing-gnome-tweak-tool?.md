---
layout:       post
title:        >
    Is the GNOME Tweaks package in Software the same as installing gnome-tweak-tool?
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/1029828
type:         Answer
tags:         18.04 gnome gnome-tweaks
created_date: 2018-04-29 19:27:13
edit_date:    2019-09-16 11:03:56
votes:        "8 "
favorites:    
views:        "20,009 "
accepted:     
uploaded:     2022-01-09 05:38:31
toc:          false
navigation:   false
clipboard:    false
---

*GNOME Tweaks* is the new name for *GNOME Tweak Tool* as stated in the [accepted answer][1]. The [release notes of GNOME 3.26 (Ubuntu 17.10)][2] states:

> - Tweak Tool has been renamed to Tweaks and has gained three new settings: a switch to move window buttons to the left or right, a Disable While Typing option for touchpads and an option to show the battery percentage in the top bar. There has also been a good amount of clean up and refinement.  

For a full list of tweak tools in 18.04 (I'm using Unity Tweak Tool) run this command:

``` 
$ apt list | grep tweak
gajim-rostertweaks/bionic,bionic 1.0.0-3 all
gnome-tweak-tool/bionic,bionic 3.28.1-1 all
gnome-tweaks/bionic,bionic 3.28.1-1 all
mate-tweak/bionic,bionic 18.04.16-1 all
mousetweaks/bionic,bionic,now 3.12.0-4 amd64 [installed]
tweak/bionic 3.02-2 amd64
unity-tweak-tool/bionic,bionic,now 0.0.7ubuntu4 all [installed]

```


  [1]: https://askubuntu.com/a/1029583/307523
  [2]: https://help.gnome.org/misc/release-notes/3.26/
