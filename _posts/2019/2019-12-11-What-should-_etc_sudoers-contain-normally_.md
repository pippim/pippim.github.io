---
layout:       post
title:        >
    What should /etc/sudoers contain normally?
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/1195402
type:         Answer
tags:         visudo
created_date: 2019-12-11 11:50:36
edit_date:    2019-12-11 12:00:58
votes:        "1 "
favorites:    
views:        "239 "
accepted:     Accepted
uploaded:     2022-02-06 11:17:02
git_md_url:   https://github.com/pippim/pippim.github.io/blob/main/_posts/2019/2019-12-11-What-should-_etc_sudoers-contain-normally_.md
toc:          false
navigation:   false
clipboard:    false
---

Here's what I change on new installations:

<pre><code>$ sudo cat /etc/sudoers
# 
# This file MUST be edited with the 'visudo' command as root.
# 
# Please consider adding local content in /etc/sudoers.d/ instead of
# directly modifying this file.
# 
# See the man page for details on how to write a sudoers file.
# 
Defaults	env_reset, <b>timestamp_timeout=120, pwfeedback</b>
<b>#Defaults	mail_badpass</b>
Defaults	secure_path="/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin:/snap/bin"
<b>Defaults:rick !secure_path</b>

  (... SNIP rest of file unchanged ...)
</code></pre>

I put my changes at the top of the file. They are displayed in bold above:

- `timeout` makes sudo privalege last for 2 hours so I don't have retype password every 5 minutes or whatever the default is.
- `pwfeedback` places a `*` on screen with each key press during password input.
- `mail_badpass` stops an email being sent to my account each time I enter the sudo password incorrectly.
- `!secure_path` is explained here: [Can I make `sudo` follow my path via CLI?](Can I make `sudo` follow my path via CLI?)
