---
layout:       post
title:        >
    Upgrade Ubuntu 16.04 LTS to 18.04 LTS = 5 desktop environments
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/1029748
type:         Question
tags:         16.04 upgrade login desktop-environments 18.04
created_date: 2018-04-29 15:43:30
edit_date:    
votes:        "2 "
favorites:    
views:        "2,176 "
accepted:     
uploaded:     2022-01-30 22:11:11
git_md_url:   https://github.com/pippim/pippim.github.io/blob/main/_posts/2018/2018-04-29-Upgrade-Ubuntu-16.04-LTS-to-18.04-LTS-_-5-desktop-environments.md
toc:          false
navigation:   false
clipboard:    false
---

I'm testing Ubuntu 16.04 LTS with **Unity** to 18.04 LTS upgrade. After rebooting The first thing I notice is five different desktop environments available at sign in:

[![Ubuntu 18.04 Five Desktops.jpg][1]][1]

- I assume the first option is GNOME on Wayland???
- The first and second options result in a movable mouse **cursor** in a sea of purple.
- The third option "Ubuntu" I have no idea if it is supposed to be Wayland or Xorg. Selecting it results in a movable mouse **pointer** in a sea of purple.
- The fourth option I wasn't brave enough to select due to Wayland problems I've read about.
- The last option "Unity" works OK but not what I would call ready for prime-time.

Can anyone explain what option 1 "GNOME" and option 3 "Ubuntu" are supposed to be using for Desktop Environment (DE)?

As I'm running the test in an easily duplicated environment: [Bash script to clone Ubuntu to new partition for testing 18.04 LTS upgrade][2], is there something I can do before conversion rather than fixing after conversion? If so I can modify the cloning script to possibly speed up conversion and one less thing to do after conversion.

I would first click the gear to select the Desktop environment and then enter my password. Then the software says "Invalid Password". I retype my password and click the gear icon again to discover my first choice has reset to the default and I have to select my first choice again. The second time I enter my password it is accepted. This happens on all options I tried except for "Unity" which accepted my password the first time.


  [1]: https://i.stack.imgur.com/dNXhZ.jpg
  [2]: {% post_url /2018/2018-04-27-Bash-script-to-backup_clone-Ubuntu-to-another-partition %}
