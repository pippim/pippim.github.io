---
layout:       post
title:        >
    Why do valid questions get closed without providing any help?
site:         Ask Ubuntu Meta
stack_url:    https://meta.askubuntu.com/q/18920
type:         Answer
tags:         discussion
created_date: 2019-12-14 01:42:50
edit_date:    
votes:        "-2 "
favorites:    
views:        "428 "
accepted:     
uploaded:     2023-12-31 10:24:11
git_md_url:   https://github.com/pippim/pippim.github.io/blob/main/_posts/2019/2019-12-14-Why-do-valid-questions-get-closed-without-providing-any-help_.md
toc:          false
navigation:   false
clipboard:    false
---

I agree that others should have asked to see content of `journalctl -b-1` in comments. Then after reason for broken suspend was ascertained posted an answer if possible or advised to file a bug report if not possible to fix.

You have to appreciate these days there are many many questions being asked without enough volunteers to carefully and thoroughly address them. Subjectively I think things have gotten worse since mods went on strike over that legal thing.

The OP could have gamed the system by simply saying "suspend is not working" instead of saying "suspend broken after 19.04 to 19.10 upgrade". It seems silly but many a question will be answered when saying "X is broken". However if you say "X is broken because of Y" then they will say file a bug report against "Y". In reality when looking at `journalctl -b-1` it may say the problem is caused by "Z" and totally unrelated to "Y".

I guess we can call this the X-Y-Z problem of prematurely closing questions.
