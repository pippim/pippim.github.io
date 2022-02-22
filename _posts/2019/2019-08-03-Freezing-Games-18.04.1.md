---
layout:       post
title:        >
    Freezing Games 18.04.1
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/1163185
type:         Answer
tags:         freeze
created_date: 2019-08-03 16:08:44
edit_date:    
votes:        "1 "
favorites:    
views:        "432 "
accepted:     Accepted
uploaded:     2022-02-22 04:32:56
git_md_url:   https://github.com/pippim/pippim.github.io/blob/main/_posts/2019/2019-08-03-Freezing-Games-18.04.1.md
toc:          false
navigation:   false
clipboard:    false
---

Your laptop appears to be about 7 years old. As such a newer kernel probably won't fix the glitch. I found 3 similar bug reports for your machine:


- [nouveau DRM GPU lockup, PFIFO unhandled status 0x00800000][1]

- 
[10de:1056 \[Dell Latitude E6520\] \[NVS 4200M\] X freeze, "unhandled status 0x00800000"][2]
- [Bug 71659 - \[NVD9\] Hangs under load with !\[ PFIFO\]\[0000:01:00.0\] unhandled status 0x00800000][3] 

This will get you started on research. Basically we need to uncover more details about what errors proceeded the last error message quoted in your question.

Within **Ask Ubuntu** there are questions and answers specific to your machine that might be helpful:

- [12.04 - How do I get a Dell Latitude e6420 working? - Ask Ubuntu][4]
- [Ubuntu Clean Install on new HD for Dell Latitude E6420][5]

Things you can try (After thoroughly researching all else):

- [2 Ways to Install Nvidia Driver on Ubuntu 18.04 (GUI & Command Line)][6]
- Switching to Ubuntu 16.04: [How to roll back Ubuntu to a previous version?][7]


  [1]: https://bugs.launchpad.net/ubuntu/+source/xserver-xorg-video-nouveau/+bug/1291574
  [2]: https://bugs.launchpad.net/ubuntu/+source/xserver-xorg-video-nouveau/+bug/1243557
  [3]: https://bugs.freedesktop.org/show_bug.cgi?id=71659
  [4]: https://askubuntu.com/questions/133608/how-do-i-get-a-dell-latitude-e6420-working
  [5]: https://askubuntu.com/questions/745910/ubuntu-clean-install-on-new-hd-for-dell-latitude-e6420
  [6]: https://www.linuxbabe.com/ubuntu/install-nvidia-driver-ubuntu-18-04
  [7]: https://askubuntu.com/questions/49869/how-to-roll-back-ubuntu-to-a-previous-version
