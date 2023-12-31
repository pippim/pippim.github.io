---
layout:       post
title:        >
    Apt says there is 1 not updated, but there are no updates
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/1014747
type:         Answer
tags:         apt package-management upgrade updates
created_date: 2018-03-14 01:56:25
edit_date:    
votes:        "0 "
favorites:    
views:        "446 "
accepted:     
uploaded:     2023-12-31 10:24:11
git_md_url:   https://github.com/pippim/pippim.github.io/blob/main/_posts/2018/2018-03-14-Apt-says-there-is-1-not-updated_-but-there-are-no-updates.md
toc:          false
navigation:   false
clipboard:    false
---

# Best guess

My best guess is you suffered a bug fix for this bug: [Want to update from 17.04 to 18.04, but do-release-upgrade fails][1].

Essentially the OP was using 17.04, wanted to upgrade to 17.10 but it took him/her to 18.04 which is invalid because it's not an officially sanctioned version yet.

It would appear rather than taking away the upgrade to 18.04 option the programmers simply suppressed the option from upgrading to 18.04. That said I would only upgrade to 18.04 in a quarantined environment (separate partition / non production) and extensive testing. Some ideas:

- Create a 18.04 Live USB with persistent storage. 
- Boot from the USB and select "Try before Installing". 
- Install your mission critical applications to the USB's persistent storage.
- Test your applications with a **COPY** of your data. 
- **Do not** test the programs on the real **live data** on `sdX`.
- Try out your USB keyboards and mice.
- Try out your printer(s).
- Access your favorite websites and download files.
- Test suspend and resume.
- Test <kbd>Fn</kbd> keys for volume and brightness.
- Make a keyboard shortcut and ensure it works ok.
- Test `systemd`, `cron` and other system utilities.
- If you've written scripts, copy them over and test them.
- Test `xrandr` functions you have used before.
- Run CPU & RAM stress tests. System benchmarks might be helpful too.
- Remember **18.04** uses Unity 7.5 but **16.04** uses Unity 7.4 I think.
- Of course you should test *Anything else you can think of*


  [1]: https://askubuntu.com/questions/1002223/want-to-update-from-17-04-to-18-04-but-do-release-upgrade-fails
