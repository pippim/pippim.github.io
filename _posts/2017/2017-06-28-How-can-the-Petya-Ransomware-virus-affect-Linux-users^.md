---
layout:       post
title:        >
    How can the Petya Ransomware virus affect Linux users?
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/930083
type:         Question
tags:         wine security malware
created_date: 2017-06-28 23:09:40
edit_date:    2017-06-29 01:47:21
votes:        "4 "
favorites:    1
views:        "3,373 "
accepted:     Accepted
uploaded:     2022-01-29 13:56:05
git_md_url:   https://github.com/pippim/pippim.github.io/blob/main/_posts/2017/2017-06-28-How-can-the-Petya-Ransomware-virus-affect-Linux-users^.md
toc:          false
navigation:   false
clipboard:    false
---

Within the last 48 hours we've been informed of the Petya ransomware similar to the ["Wanna Cry"][1] ransomware. Both ransomware packages encrypt your data and demand $300 to unlock your data. However in the Petya case Germany has closed down the email address to respond to so you can't pay even if you wanted to.

Unlike "Wanna Cry" which had a global kill-switch that was turned on within 72 hours by accident, "Petya" requires you to create a local file in order to stop your data getting encrypted however you are still infected and can pass the ransomware onto other systems.

I read in the story [‘Petya’ ransomware may be smokescreen for potentially larger attack][2] you need to create the file `C:\Windows\perfc` and flag it as read-only to protect your system. This would include Linux users using `wine` I presume. However:

- in the comment section a user posted the file name must be `C:\Windows\perfc.exe`.

- in [Ransomware Vaccine Now Available][3] they say the file name must be `C:\Windows\perfc.dll`.

Can anyone confirm Linux Wine users are potential victims and what the actual read-only file name must be?


  [1]: https://askubuntu.com/questions/914623/what-is-the-wanna-cry-ransomwares-possible-impact-on-linux-users
  [2]: https://www.rt.com/viral/394420-petya-smokescreen-larger-attack/
  [3]: https://www.infosecurity-magazine.com/news/petya-ransomware-vaccine-now/
