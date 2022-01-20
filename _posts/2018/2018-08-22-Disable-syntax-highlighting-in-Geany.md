---
layout:       post
title:        >
    Disable syntax highlighting in Geany
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/1067677
type:         Answer
tags:         geany syntax-highlighting
created_date: 2018-08-22 00:31:55
edit_date:    
votes:        "2 "
favorites:    
views:        "512 "
accepted:     
uploaded:     2022-01-19 20:40:17
git_md_url:   https://github.com/pippim/pippim.github.io/blob/main/_posts/2018/2018-08-22-Disable-syntax-highlighting-in-Geany.md
toc:          false
navigation:   false
clipboard:    false
---

Rather than renaming your `.sh` scripts with an `.txt` extension there is a more conventional way to [remove syntax highlighting][1]:

Edit `Menu->tools->configuration files->filetype_extensions.conf` and remove the `*.sh`; entries.


  [1]: https://github.com/geany/geany/issues/1596
