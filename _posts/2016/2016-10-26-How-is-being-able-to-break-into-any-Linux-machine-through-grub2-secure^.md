---
layout:       post
title:        >
    How is being able to break into any Linux machine through grub2 secure?
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/842196
type:         Answer
tags:         boot permissions security grub
created_date: 2016-10-26 23:54:19
edit_date:    2017-04-13 12:24:41
votes:        "3 "
favorites:    
views:        "18,747 "
accepted:     
uploaded:     2022-01-14 19:59:53
git_md_url:   https://github.com/pippim/pippim.github.io/blob/main/_posts/2016/2016-10-26-How-is-being-able-to-break-into-any-Linux-machine-through-grub2-secure^.md
toc:          false
navigation:   false
clipboard:    false
---

Your intentional hack starts with this:

 1. When grub2 menu opens press 'e' to edit the linux start options

But you can password protect the `e` option as discussed here: [How to add the GRUB password protection to the OS load process instead of when editing boot options][1]

You can take the extra step of encrypting the grub password as discussed in the link. Indeed with perhaps 3% of the population (wild guess) using Linux / Ubuntu at home it's a good idea for System Administrators to protect against the `e` function on production systems at work. I imagine if Ubuntu is used at work then 30 to 40% would be using it at home too and maybe 10% of those will be learning how to do the `e` on their home systems.

Thanks to your question they have just learned more. With the link above though, System Administrators have another task on their to-do list to protect production environments.


  [1]: https://askubuntu.com/questions/370693/how-to-add-the-grub-password-protection-to-the-os-load-process-instead-of-when-e
