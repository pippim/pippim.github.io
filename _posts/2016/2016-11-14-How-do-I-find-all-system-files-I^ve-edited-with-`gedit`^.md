---
layout:       post
title:        >
    How do I find all system files I've edited with `gedit`?
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/849163
type:         Question
tags:         gedit log
created_date: 2016-11-14 00:53:33
edit_date:    2017-04-13 12:24:16
votes:        "2 "
favorites:    1
views:        "154 "
accepted:     
uploaded:     2022-01-15 17:41:50
git_md_url:   https://github.com/pippim/pippim.github.io/blob/main/_posts/2016/2016-11-14-How-do-I-find-all-system-files-I^ve-edited-with-`gedit`^.md
toc:          false
navigation:   false
clipboard:    false
---

At first I was going to ask the question "Find all files I've created / changed after installation?" but that is a duplicate of ([Find all files on the filesystem that I have edited or created][1]) which doesn't have a satisfactory answer because it includes stuff downloaded and never changed plus thousands of thumbnails Nautilus has created under my user ID unbeknownst to me.

The reason for this need is I had written a nifty script to power-off a USB port on my laptop that always has power in order to win a bounty.

Now I'm very displeased that my **always powered on USB port by design** is powered off during suspend or shutdown. I want to track down and revert the programs those systemd configurations I setup with `gedit`. Having a poor memory for impromptu things I can't remember what I changed.

**How do I find all the files I've created or changed with `gedit`?**

I have created a wrapper script called `gsu` that uses `pkexec` to replace `gksu gedit` ([How can I create new &quot;gksu&quot; command based on pkexec?][2]). I will change it to log all system files edited with their last date. 

In the mean time someone hinted on that link all sudo commands using gedit were logged someplace. The question is where and how to succiently list them with `grep` or whatever?

Please note I can find this through other time-consuming means but feel this is an important question many others may have as well.

  [1]: https://askubuntu.com/questions/217477/find-all-files-on-the-filesystem-that-i-have-edited-or-created
  [2]: {% post_url /2016/2016-11-10-How-can-I-create-new-^gksu^-command-based-on-pkexec^ %}
