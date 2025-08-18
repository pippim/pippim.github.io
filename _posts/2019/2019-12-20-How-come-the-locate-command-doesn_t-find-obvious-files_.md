---
layout:       post
title:        >
    How come the locate command doesn't find obvious files?
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/1197395
type:         Answer
tags:         locate
created_date: 2019-12-20 01:38:40
edit_date:    
votes:        "2 "
favorites:    
views:        "34,810 "
accepted:     
uploaded:     2025-08-18 11:20:17
git_md_url:   https://github.com/pippim/pippim.github.io/blob/main/_posts/2019/2019-12-20-How-come-the-locate-command-doesn_t-find-obvious-files_.md
toc:          false
navigation:   false
clipboard:    false
---

Being somewhat lazy and not wanting to run `sudo updatedb` and, since I have a computer that can work for me, it runs `sudo updatedb` every 15 minutes so I don't have to.

Use `sudo crontab -e` and find this line:

``` 
# m h  dom mon dow   command
```

insert below it:

``` 
*/15 *  *   *   *     /usr/bin/updatedb
```

Then press <kbd>Ctrl</kbd>+<kbd>O</kbd> to save the file (write it **O**ut) and then  <kbd>Ctrl</kbd>+<kbd>X</kbd> to e**X**it.

If you've just created the files in the last 15 minutes though you will still need to run:

``` 
sudo updatedb
```

... to manually update the indices used by `locate` command.
