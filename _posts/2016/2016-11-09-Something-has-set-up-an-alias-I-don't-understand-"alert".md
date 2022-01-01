---
layout:       post
title:        >
    Something has set up an alias I don't understand "alert"
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/847302
type:         Question
tags:         alias
created_date: !!str "2016-11-09 03:30:07"
edit_date:    !!str "2020-06-12 14:37:07"
votes:        !!str "1"
favorites:    
views:        !!str "350"
accepted:     Accepted
uploaded:     !!str "2021-12-31 17:41:14"
toc:          false
navigation:   false
clipboard:    false
---

When I type in the command `alias` I get some funny things I don't understand:

``` 
rick@dell:~$ alias
alias alert='notify-send --urgency=low -i "$([ $? = 0 ] && echo terminal || echo error)" "$(history|tail -n1|sed -e '\''s/^\s*[0-9]\+\s*//;s/[;&|]\s*alert$//'\'')"'
alias egrep='egrep --color=auto'
alias fgrep='fgrep --color=auto'
alias grep='grep --color=auto'
alias l='ls -CF'
alias la='ls -A'
alias ll='ls -alF'
alias ls='ls --color=auto'

```

The first command / alias seems to do nothing when I type:

``` 
rick@dell:~$ alert "It's raining"

```

How, where, when and why is this `alert` command supposed to be used in an `alias`?

----------

### Duplicate close thoughts:

The proposed duplicate explains `alert` alias to great extent but doesn't explain why typing `Alert "It's raining"` does NOT result in a notification bubble.

The question above does ask for complete explanation though which the CV duplicate satisfied.

A day after the above question was posted a new Question with "provide your own Answer" option was posted here: ([notify-send (alert) not popping-up GUI bubble messages][2]) and it solves the reason for posting the above question in the first place.

The above CV candidate question can almost be considered "too broad" because it is seeking advice about aliases AND ~/.bashrc AND notify-send.

I have voted to close this question as a duplicate too.


  [1]: https://askubuntu.com/questions/847294/why-is-sudo-colourless-when-user-is-colourful-for-ls-command
  [2]: {% post_url /2016/2016-11-10-notify-send-(alert)-not-popping-up-GUI-bubble-messages %}
