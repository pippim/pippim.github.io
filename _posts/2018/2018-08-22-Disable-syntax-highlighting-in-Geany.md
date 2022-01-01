---
layout:       post
title:        >
    Disable syntax highlighting in Geany
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/1067677
type:         Answer
tags:         geany syntax-highlighting
created_date: !!str "2018-08-22 00:31:55"
edit_date:    !!str ""
votes:        !!str "2"
favorites:    
views:        !!str "500"
accepted:     
uploaded:     !!str "2021-12-31 19:13:18"
toc:          false
navigation:   false
clipboard:    false
---

Rather than renaming your `.sh` scripts with an `.txt` extension there is a more conventional way to [remove syntax highlighting][1]:

Edit `Menu->tools->configuration files->filetype_extensions.conf` and remove the `*.sh`; entries.


  [1]: https://github.com/geany/geany/issues/1596
