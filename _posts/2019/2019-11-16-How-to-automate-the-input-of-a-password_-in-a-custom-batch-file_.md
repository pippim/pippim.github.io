---
layout:       post
title:        >
    How to automate the input of a password, in a custom batch file?
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/1189182
type:         Answer
tags:         command-line bash scripts
created_date: 2019-11-16 01:42:38
edit_date:    2019-11-16 05:28:28
votes:        "1 "
favorites:    
views:        "5,725 "
accepted:     Accepted
uploaded:     2025-05-24 22:53:28
git_md_url:   https://github.com/pippim/pippim.github.io/blob/main/_posts/2019/2019-11-16-How-to-automate-the-input-of-a-password_-in-a-custom-batch-file_.md
toc:          false
navigation:   false
clipboard:    false
---

You can take `sudo` out of your script and ensure users call the script using `sudo scriptname`.

Remove `sudo -i` line from your script and replace it with this:

``` 
# Must prefix with sudo when calling script
if ! [[ $(id -u) == 0 ]]; then
    echo You must call this script using sudo. Aborting.
    exit 99
fi
```
