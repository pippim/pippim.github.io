---
layout:       post
title:        >
    Configure scrolling using Logitech Trackball on VMWare
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/1165891
type:         Answer
tags:         xorg mouse vmware logitech
created_date: 2019-08-15 11:30:40
edit_date:    
votes:        "0 "
favorites:    
views:        "2,273 "
accepted:     
uploaded:     2023-12-31 10:24:11
git_md_url:   https://github.com/pippim/pippim.github.io/blob/main/_posts/2019/2019-08-15-Configure-scrolling-using-Logitech-Trackball-on-VMWare.md
toc:          false
navigation:   false
clipboard:    false
---

Firstly, when entries are duplicated in `xinput` users appear uninterested in removing duplicates. They seem more interested in applying configuration changes to both first and duplicate entries in `xinput` with a [script like this][1]. Although you are only changing device ID 7 it could be beneficial to make the same changes to device ID 8.

The bad atom error message seems to be related to SSH:

- [Why do remote programs crash with an X Error of failed request: BadAtom?][2]. VMware does have a configuration option for X11Forwarding to fix this too: [Solved: No able to perform vmrun via ssh][3]


I found the following VMWare links to research. None provided a definitive answer but the questions and answers might provide clues:

- [Workstation 14 - no Logitech mouse wheel in guest][4] - Solution was to disable Logitech smooth scrolling
- [Cannot scroll in VMs with trackpad][5] - Not solved but help article to read was [recommended](https://kb.vmware.com/s/article/1008443)
- [Horizontal scrolling with a trackball mouse?][6] - Not answered
- [Mouse click partially works!!!][7] - Not answered
- [Mouse Click Release][8] - One user found removing Kensington driver and using generic driver solved issue.


  [1]: https://stackoverflow.com/questions/18755967/how-to-make-a-program-that-finds-ids-of-xinput-devices-and-sets-xinput-some-set/18756948#18756948
  [2]: https://x.cygwin.com/docs/faq/cygwin-x-faq.html#q-bad-atom
  [3]: https://communities.vmware.com/thread/68826
  [4]: https://communities.vmware.com/thread/575757
  [5]: https://communities.vmware.com/thread/582736
  [6]: https://communities.vmware.com/thread/186366
  [7]: https://communities.vmware.com/thread/579217
  [8]: https://communities.vmware.com/thread/74454
