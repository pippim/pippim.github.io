---
layout:       post
title:        >
    How can I shorten my command line (bash) prompt?
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/1165407
type:         Answer
tags:         command-line bash bashrc prompt ps1
created_date: 2019-08-13 11:32:11
edit_date:    2019-08-13 22:55:04
votes:        "2 "
favorites:    
views:        "240,811 "
accepted:     
uploaded:     2022-01-19 20:19:27
git_md_url:   https://github.com/pippim/pippim.github.io/blob/main/_posts/2019/2019-08-13-How-can-I-shorten-my-command-line-^bash^-prompt^.md
toc:          false
navigation:   false
clipboard:    false
---

I [wrote a function][1] you can modify to suit your needs:

``` 
function termprompt() {
    PS1="${PS1//@\\h/}"     # Remove @host
    PS1="${PS1//\\w/\\W}"   # Change from full directory to last name
}
```

Place this function at or near the bottom of `~/.bashrc` after the `PS1` line has been fully computed.

You would type `termprompt` whenever you wanted to shorten your prompt or, have `termprompt` called from the bottom of your `~/.bashrc` for permanency.

The advantage of this technique over many other answers is `.bashrc` can setup `PS1` in four different ways (xterm+no-color, xterm+color, no-xterm+no-color, no-xterm+color). This answer supports all four current methods and probably future methods too.

Another advantage is this method has less complex control codes to traverse over in order to insert your changes.

  [1]: https://askubuntu.com/questions/1164844/script-to-hide-names-in-command-prompt/1164845#1164845
