---
layout:       post
title:        >
    How can PPAs be removed using GUI?
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/1002996
type:         Answer
tags:         apt ppa gui software-sources
created_date: 2018-02-04 16:56:48
edit_date:    2020-06-12 14:37:07
votes:        "15 "
favorites:    
views:        "1,355 "
accepted:     Accepted
uploaded:     2022-02-10 04:59:25
git_md_url:   https://github.com/pippim/pippim.github.io/blob/main/_posts/2018/2018-02-04-How-can-PPAs-be-removed-using-GUI_.md
toc:          false
navigation:   false
clipboard:    false
---

# Remove PPAs with Ubuntu 16.04 LTS GUI

Select Software Settings -> Software & Updates -> Other Software:

[![Remove PPA.png][1]][1]

Highlight the PPA you want to remove and click the <kbd>Remove</kbd> button.

Note that many PPA's have two entries; one for the programs and one for the source code.

You should have an Internet connection before completing this operation because Ubuntu needs to update apt sources when you close the panel.

For more details see these [Tecmint Instructions][2] with many screen shots for both adding PPAs and removing PPAs.


  [1]: https://i.stack.imgur.com/wMJvE.png
  [2]: https://www.tecmint.com/add-remove-purge-ppa-in-ubuntu/
