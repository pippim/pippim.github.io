---
layout:       post
title:        >
    Port 22: Connection refused
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/1568907
type:         Answer
tags:         ssh openssh
created_date: 2026-08-09 21:36:27
edit_date:    2026-08-10 00:19:44
votes:        "3 "
favorites:    
views:        "77 "
accepted:     
uploaded:     2026-10-09 16:40:21
git_md_url:   https://github.com/pippim/pippim.github.io/blob/main/_posts/2026/2026-08-09-Port-22_-Connection-refused.md
toc:          false
navigation:   false
clipboard:    false
---

Only some of the necessary firewall steps are included in the question's statement of steps taken.

Complete Firewall Setup:

- Check firewall status: `sudo ufw status`

- Allow port 22: `sudo ufw allow 22/tcp`

- Turn on firewall: `sudo ufw enable`

- Verify changes: `sudo ufw status verbose`

---

For further reference, see this question in Stack Overflow: 

- [How can I open some ports on Ubuntu?][1]


  [1]: https://stackoverflow.com/questions/30251889/how-can-i-open-some-ports-on-ubuntu
