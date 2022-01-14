---
layout:       post
title:        >
    Is it possible to fix Ubuntu 16.04 by installing Ubuntu 16.04 over the top of the existing Ubuntu 16.04?
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/820260
type:         Answer
tags:         update-alternatives
created_date: 2016-09-02 23:30:54
edit_date:    2017-04-13 12:23:35
votes:        "0 "
favorites:    
views:        "285 "
accepted:     Accepted
uploaded:     2022-01-14 05:00:10
git_md_url:   https://github.com/pippim/pippim.github.io/blob/main/_posts/2016/2016-09-02-Is-it-possible-to-fix-Ubuntu-16.04-by-installing-Ubuntu-16.04-over-the-top-of-the-existing-Ubuntu-16.04^.md
toc:          false
navigation:   false
clipboard:    false
---

When you install Ubuntu 16.04 overtop of an existing 16.04 you won't have to reinstall Windows OS because it's on a separate partition. Just make sure you pick the installation option "Install alongside windows".

The question of how to install overtop an existing version of Ubuntu (without upgrading / conversion pains) is described here: [how-to-reinstall-ubuntu-keeping-my-data-intact][1] Pay close attention to the files that need to be backed up.

Having to reinstall the non-Ubuntu Linux applications you've been using is not necessarily a bad thing because you get fresh, clean, up-to-date non-converted versions of them too.

If you are in doubt of the "new installation" process and have extra space you can shrink the current Ubuntu partition using GParted. Then create a new partition and install a second fresh version of Ubuntu 16.04. Next install all the non-Ubuntu Linux applications you've been using and test them. Of course this takes extra time but gives you peace of mind about the whole installation from scratch process with this trial run.

  [1]: https://askubuntu.com/questions/19808/how-to-reinstall-ubuntu-keeping-my-data-intact
