---
layout:       post
title:        >
    How can I display text from a file automatically after powering up my computer, in text editor or terminal?
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/826898
type:         Answer
tags:         bash scripts
created_date: 2016-09-19 10:51:34
edit_date:    2019-10-25 01:57:15
votes:        "9 "
favorites:    
views:        "1,862 "
accepted:     Accepted
uploaded:     2025-05-24 22:53:28
git_md_url:   https://github.com/pippim/pippim.github.io/blob/main/_posts/2016/2016-09-19-How-can-I-display-text-from-a-file-automatically-after-powering-up-my-computer_-in-text-editor-or-terminal_.md
toc:          false
navigation:   false
clipboard:    false
---

Your first step is to find out the name of your notepad / GUI editor / writer program as described in this Q&A: [How does one find out the command line corresponding to GUI app (eg, LibreOffice Writer)?](How does one find out the command line corresponding to GUI app (eg, LibreOffice Writer)?)e In my case I use LibreOffice Write and the command is `libreoffice --writer`.

The next step is to select `Dash` which is the first option on the `Launcher`. In the search field type in `Startup` and select the icon **Startup Applications**. The following window pops up: 

[![Startup Applications][1]][1]

Select the `Add` button. And this window appears:

[![enter image description here][2]][2]

Fill in your writer / program name and pass it the name of your to-do file. This is probably the hardest part to get right and often requires a little experimentation.

## Edit 1


Proving that experimentation is needed when using the above example tonight an error was displayed:

[![ToDo does not exist][3]][3]

Checking the actual file name ends in `.odt` edit the Startup Application profile and change the file name by adding the extension `.odt` and then voila on every boot you get:

[![ToDo List][4]][4]


  [1]: https://pippim.github.io/assets/img/posts/2016/zseqym.png
  [2]: https://pippim.github.io/assets/img/posts/2016/KBcwhm.png
  [3]: https://pippim.github.io/assets/img/posts/2016/ScnJam.png
  [4]: https://pippim.github.io/assets/img/posts/2016/4OaV6l.png
